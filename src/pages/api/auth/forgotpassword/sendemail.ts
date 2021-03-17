import {NextApiRequest, NextApiResponse} from 'next'
import {getUserFromEmail} from '../../../../utils/users'
import {getTokenWithEmail, createToken} from '../../../../utils/passwordResetTokens'
import {sendPasswordResetToken} from '../../../../utils/emails'
import crypto from 'crypto'

const createRandomToken = async () => {
    return await new Promise((res, rej) => {
        crypto.randomBytes(48, (err, buffer) => {
            if(err) return rej(err)
            return res(buffer.toString('hex'))
        })
    })
}

export default async function SendEmail(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'Ok...'})
    }

    try {

        const user = await getUserFromEmail(req.body.email)

        if(!user) {
            return res.status(409).json({field: 'email', msg: 'No user registered with this email.'})
        }

        const passwordResetToken = await getTokenWithEmail(req.body.email)

        const token = passwordResetToken ? passwordResetToken.token : await createRandomToken()

        if(!passwordResetToken) {
            await createToken(token, req.body.email, user._id)
        }

        await sendPasswordResetToken(token, req.body.email)

        return res.status(200).json({msg: 'succss'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}