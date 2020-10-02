import { NextApiResponse, NextApiRequest } from "next";
import {getTimePeriod} from '../../../utils/timePeriods'
import {ObjectId} from 'mongodb'

export default async function GetTimePeriod(req:NextApiRequest, res:NextApiResponse) {

    const id = req.query.id as string

    try {
        if(!ObjectId.isValid(id)) {
            return res.status(400).json({msg: 'Invalid request'})
        }

        if(req.method === 'GET') {
            const timePeriod = await getTimePeriod(new ObjectId(id))
            return res.status(200).json({timePeriod})
        }
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server error'})
    }
}