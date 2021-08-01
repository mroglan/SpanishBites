import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../../utils/auth'
import {addPreview} from '../../../../utils/users'
import jwt from 'jsonwebtoken'
import {setCookie} from 'nookies'

export default verifyUser(async function AddPreview(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'bye'})
    }

    try {

        if(req.body.jwtUser.previews.length > 4) {
            return res.status(400).json({msg: 'Exceeded preview limit'})
        }

        const itemInfo = {type: req.body.type, id: req.body.id}

        await addPreview(req.body.jwtUser, itemInfo)

        const claims = {...req.body.jwtUser, previews: [...req.body.jwtUser.previews, itemInfo]}

        const token = jwt.sign(claims, process.env.SIGNATURE)

        setCookie({res}, 'auth', token, {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: true,
            maxAge: 172800,
            path: '/'
        })

        return res.status(200).json({msg: 'successful update'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})