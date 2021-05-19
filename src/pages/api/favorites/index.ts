import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../utils/auth'
import { getFavorites } from '../../../utils/favorites'

export default verifyUser(async function Favorites(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'ok...'})
    }

    try {

        const {operation, jwtUser} = req.body

        if(operation === 'get-favorites') {
            const favorites = await getFavorites(jwtUser._id)
            return res.status(200).json(favorites)
        }
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})