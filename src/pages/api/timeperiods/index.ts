import { NextApiResponse, NextApiRequest } from "next";
import {getAllTimePeriods} from '../../../utils/timePeriods'

export default async function TimePeriods(req:NextApiRequest, res:NextApiResponse) {

    try {
        if(req.method === 'GET') {
            const timePeriods = await getAllTimePeriods()
            return res.status(200).json({timePeriods})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}