import { NextApiResponse, NextApiRequest } from "next";
import {getAllUnpopulatedAuthors} from '../../../utils/authors'

export default async function GetAllUnpopulatedAuthors(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(req.method !== 'GET') {
            return res.status(400).json({msg: '???'})
        }

        const authors = await getAllUnpopulatedAuthors()

        return res.status(200).json({authors})
    } catch(e) {
        return res.status(500).json({msg: 'Internal Server Error'})
    }
}