import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../../utils/auth'
import {getRecentlyViewed} from '../../../../utils/users'

export default verifyUser(async function GetRecentlyViewed(req:NextApiRequest, res:NextApiResponse) {

    try {

        const recentlyViewed = await getRecentlyViewed(req.query.user as string)

        return res.status(200).json(recentlyViewed)
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})