import {NextApiRequest, NextApiResponse} from 'next'
import {setCookie} from 'nookies'

export default async function LibrarySettings(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'ok...'})
    }

    try {

        const {settings} = req.body

        setCookie({res}, 'librarySettings', JSON.stringify(settings), {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: true,
            maxAge: 2147483647,
            path: '/'
        })

        return res.status(200).json({msg: 'success'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}