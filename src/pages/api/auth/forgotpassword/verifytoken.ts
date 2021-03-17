import {NextApiRequest, NextApiResponse} from 'next'
import {isTokenWithToken} from '../../../../utils/passwordResetTokens'

export default async function VerifyToken(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'ok...'})
    }

    try {

        const isToken = await isTokenWithToken(req.body.token)

        if(!isToken) {
            return res.status(409).json({msg: 'No token found'})
        }

        return res.status(200).json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}