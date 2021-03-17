import {NextApiRequest, NextApiResponse} from 'next'
import {getUserFromEmail} from '../../../../utils/users'
import {getTokenWithEmail, createToken} from '../../../../utils/verificationTokens'
import {sendToken} from '../../../../utils/emails'

export default async function Resend(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'ok...'})
    }

    try {

        const user = await getUserFromEmail(req.body.email)

        if(user) {
            return res.status(409).json({field: 'email', msg: 'This email is already verified.'})
        }

        const vToken = await getTokenWithEmail(req.body.email)

        if(!vToken) {
            return res.status(409).json({field: 'email', msg: 'This email is not registered.'})
        }

        await sendToken(vToken.token, req.body.email)

        return res.status(200).json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}