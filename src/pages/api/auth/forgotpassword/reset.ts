import {NextApiRequest, NextApiResponse} from 'next'
import {getTokenWithToken, deleteToken} from '../../../../utils/passwordResetTokens'
import {updateUserPassword} from '../../../../utils/users'
import bcrypt from 'bcrypt'

export default async function Reset(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'ok...'})
    }

    try {

        const token = await getTokenWithToken(req.body.token)

        if(!token) {
            return res.status(409).json({msg: 'No token found'})
        }

        const hashedPassword:string = await new Promise((res, rej) => {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err) rej(err)
                res(hash)
            })
        })

        await Promise.all([updateUserPassword(token.userId, hashedPassword), deleteToken(token._id)])

        return res.status(200).json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}