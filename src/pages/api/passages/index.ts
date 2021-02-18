import { NextApiResponse, NextApiRequest } from "next";
import {getAllPassages} from '../../../utils/passages'

export default async function GetAllPassages(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const passages = await getAllPassages()
            return res.status(200).json({passages})
        }
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}