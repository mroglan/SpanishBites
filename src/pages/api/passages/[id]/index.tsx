import { NextApiResponse, NextApiRequest } from "next";
import {getPassage} from '../../../../utils/passages'

export default async function GetPassage(req:NextApiRequest, res:NextApiResponse) {

    const id = req.query.id as string

    try {

        if(req.method === 'GET') {
            const passage = await getPassage(id)
            return res.status(200).json({passage})
        }
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}