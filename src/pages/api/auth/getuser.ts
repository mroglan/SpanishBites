import {NextApiRequest, NextApiResponse} from 'next'
import {getUserFromApi} from '../../../utils/users'

export default async function GetUser(req:NextApiRequest, res:NextApiResponse) {

    try {

        const user = await getUserFromApi(req)

        if(user) {
            return res.status(200).json(user)
        }
        return res.status(403).json({msg: 'Not authenticated'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}