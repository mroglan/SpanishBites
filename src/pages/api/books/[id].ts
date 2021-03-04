import { NextApiResponse, NextApiRequest } from "next";
import {getBook} from '../../../utils/books'

export default async function GetBook(req:NextApiRequest, res:NextApiResponse) {

    const id = req.query.id as string
    
    try {
    
        if(req.method === 'GET') {
            const book = await getBook(id)
            return res.status(200).json({book})
        }
        
        return res.status(400).json({msg: 'Invalid request'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
    
}