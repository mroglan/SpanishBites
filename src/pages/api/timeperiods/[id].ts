import { NextApiResponse, NextApiRequest } from "next";
import {getTimePeriod} from '../../../utils/timePeriods'

export default async function GetTimePeriod(req:NextApiRequest, res:NextApiResponse) {

    const id = req.query.id as string

    try {
        if(req.method === 'GET') {
            const timePeriod = await getTimePeriod(id)
            return res.status(200).json({timePeriod})
        }
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server error'})
    }
}