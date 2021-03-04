import { NextApiResponse, NextApiRequest } from "next";
import {getAllAuthors} from '../../../utils/authors'

export default async function GetAllAuthors(req:NextApiRequest, res:NextApiResponse) {

    try {
        if(req.method === 'GET') {
            const authors = await getAllAuthors()
            return res.status(200).json({authors})
        }

        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}