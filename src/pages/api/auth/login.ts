import {NextApiRequest, NextApiResponse} from 'next'
import {getUserFromEmail} from '../../../utils/users'
import {isTokenWithEmail} from '../../../utils/verificationTokens'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {setCookie} from 'nookies'

async function findNoUserMessage(email:string) {

    const notVerified = await isTokenWithEmail(email)

    if(notVerified) {
        return 'This email is not verified.'
    }
    return 'This email is not registered.'
}

export default async function Login(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return  res.status(400).json({msg: 'gg2ez'})
    }

    try {

        console.log(req.body)

        const {email, password} = req.body

        const user = await getUserFromEmail(email)

        if(!user) {
            const msg = await findNoUserMessage(email)
            return res.status(403).json({field: 'email', msg})
        }

        const match = await new Promise((res, rej) => {
            bcrypt.compare(password, user.password, (err, result) => {
                if(err) rej(err)
                res(result)
            })
        })

        if(!match) {
            return res.status(403).json({field: 'password', msg: 'Incorrect password.'})
        }

        const claims = {
            _id: user._id,
            username: user.username,
            email,
            premiumExpiration: user.premiumExpiration,
            preview: user.previews,
            image: user.image || '',
            name: user.name
        }

        const token = jwt.sign(claims, process.env.SIGNATURE, {expiresIn: '48hr'})

        setCookie({res}, 'auth', token, {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: true,
            maxAge: 172800,
            path: '/'
        })

        return res.status(200).json({msg: 'logging in...'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}