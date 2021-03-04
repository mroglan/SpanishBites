import { NextApiResponse, NextApiRequest } from "next";
import {getAuthor} from '../../../utils/authors'

export default async function GetAuthor(req:NextApiRequest, res:NextApiResponse) {

    const id = req.query.id as string

    try {
    
        if(req.method === 'GET') {
            const author = await getAuthor(id)
            return res.status(200).json({author})
        }
    
        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
    
}