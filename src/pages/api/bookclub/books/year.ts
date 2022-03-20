import {NextApiRequest, NextApiResponse} from 'next'
import { getEventsForYear } from '../../../../utils/clubEvents'

export default async function Year(req:NextApiRequest, res:NextApiResponse) {

    if (req.method === 'GET') {
        return res.status(400).json({msg: 'ok...'})
    }

    try {

        const {year} = req.body

        const events = await getEventsForYear(year)

        return res.status(200).json(events)
    } catch (e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}