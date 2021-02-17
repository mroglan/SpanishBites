import { NextApiResponse, NextApiRequest } from "next";
import {getAllBooks} from '../../../utils/books'

export default async function GetAllBooks(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method === 'GET') {
            const books = await getAllBooks()
            return res.status(200).json({books})
        }

    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}