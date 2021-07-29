import {NextApiRequest, NextApiResponse} from 'next'
import {getPremiumInfo} from '../../../../utils/authors'
import {verifyPremiumForResources} from '../../../../utils/auth'

export default verifyPremiumForResources(async function Premium(req:NextApiRequest, res:NextApiResponse) {

    const id = req.query.id as string

    try {

        const info = await getPremiumInfo(id)

        return res.status(200).json(info)
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})