import {NextApiRequest, NextApiResponse} from 'next'
import {getTokenWithToken, deleteToken} from '../../../../utils/verificationTokens'
import {createUser} from '../../../../utils/users'

export default async function VerifyEmail(req:NextApiRequest, res:NextApiResponse) {
    
    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'Ok...'})
    }

    try {

        const {token} = req.body

        if(!token) {
            return res.status(409).json({msg: 'No token provided'})
        }

        const vToken = await getTokenWithToken(token)

        if(!vToken) {
            return res.status(409).json({type: 'tokenNotFound'})
        }

        await Promise.all([createUser(vToken.userInfo), deleteToken(vToken._id)])

        return res.status(200).json({msg: 'Success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}