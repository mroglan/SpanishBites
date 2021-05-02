import {NextApiRequest, NextApiResponse} from 'next'
import {addContactMessage} from '../../../utils/contactMessage'

export default async function NewMessage(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'Ok...'})
    }

    try {

        const {values} = req.body

        await addContactMessage(values)

        return res.status(200).json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}