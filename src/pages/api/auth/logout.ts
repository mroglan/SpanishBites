import {NextApiRequest, NextApiResponse} from 'next'
import {setCookie} from 'nookies'

export default function Logout(req:NextApiRequest, res:NextApiResponse) {

    setCookie({res}, 'auth', 'bye bye', {
        maxAge: 0,
        path: '/',
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict'
    })

    return res.status(200).json({msg: 'Logging out...'})
}
