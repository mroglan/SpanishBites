import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../utils/auth'
import { getFavorites, updateFavorites } from '../../../utils/favorites'
import {getUserFromApi} from '../../../utils/users'

export default async function Favorites(req:NextApiRequest, res:NextApiResponse) {

    try {

        const jwtUser = await getUserFromApi(req)

        if(!jwtUser) return res.status(401).json({msg: 'YOU CANNOT PASS'})

        const {operation, favorites} = req.body

        if(req.method === 'GET') {
            const favorites = await getFavorites(jwtUser._id)
            return res.status(200).json(favorites)
        }
        if(operation === 'update-favorites') {
            await updateFavorites(jwtUser._id, favorites)
            return res.status(200).json({msg: 'successfull update'})
        }

        return res.status(422).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}