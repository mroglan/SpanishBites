import {NextApiRequest, NextApiResponse} from 'next'
import {getUserFromApi, addToRecentlyAdded, getUser} from '../../../../utils/users'

export default async function UpdateRecentlyAdded(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(403).json({msg: 'ok...'})
    }

    try {

        const clientUser =  await getUserFromApi(req)

        if(!clientUser) return res.status(403).json({msg: 'Not Signed In'})

        const user = await getUser(clientUser._id)

        if(!user.recentlyViewed) {
            user.recentlyViewed  = [req.body.item]
        } else {
            user.recentlyViewed = user.recentlyViewed.filter(item => item.id !== req.body.item.id)
            user.recentlyViewed.unshift(req.body.item)
            if(user.recentlyViewed.length > 10) {
                user.recentlyViewed.pop()
            }
        }

        await addToRecentlyAdded(user._id, user.recentlyViewed)
        
        return res.status(200).json({msg: 'Updated Recently Viewed'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}