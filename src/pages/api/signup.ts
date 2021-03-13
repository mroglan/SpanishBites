import {NextApiRequest, NextApiResponse} from 'next'
import {client} from '../../database/fauna-db'
import {query as q} from 'faunadb'
import {isUserWithEmail, isUserWithUsername} from '../../utils/users'
import {createToken, isTokenWithEmail} from '../../utils/verificationTokens'
import {sendToken} from '../../utils/emails'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export default async function SignUp(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'Ok...'})
    }

    try {

        if(!req.body.name.match(/^[\w\-\s]+$/)) {
            return res.status(409).json({msg: 'Name must be alphanumeric.', field: 'name'})
        }

        if(req.body.password !== req.body.passwordConfirmation) {
            return res.status(409).json({msg: 'Your passwords do not match.', field: 'passwordConfirmation'})
        }

        const usedEmail = await isUserWithEmail(req.body.email)

        if(usedEmail) {
            return res.status(409).json({msg: 'This email is currently in use.', field: 'email'})
        }

        const usedEmailInToken = await isTokenWithEmail(req.body.email)

        if(usedEmailInToken) {
            return res.status(409).json({msg: 'This email is currently in use.', field: 'email'})
        }

        const hashedPassword:string = await new Promise((res, rej) => {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) rej(err)
                res(hash)
            })
        })

        const randomToken:string = await new Promise((res, rej) => {
            crypto.randomBytes(48, (err, buffer) => {
                if(err) return rej(err)
                return res(buffer.toString('hex'))
            })
        })

        await createToken(randomToken, {
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword
        })

        await sendToken(randomToken, req.body.email)

        return res.status(200).json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}