import {GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'
import Router from 'next/router'
import {parseCookies} from 'nookies'

const redirectTo = (ctx:GetServerSidePropsContext, url:string) => {
    if(!ctx.req) {
        Router.replace('url')
    } else {
        ctx.res.writeHead(302, {
            Location: `${process.env.BASE_URL}${url}`
        })
        ctx.res?.end()
    }
}

export async function ensureAuth(ctx:GetServerSidePropsContext) {
    try {
        const {auth} = parseCookies(ctx)

        const user = await new Promise((res, rej) => {
            jwt.verify(auth, process.env.SIGNATURE, (err, decoded) => {
                if(!err && decoded) res(decoded)
                rej('Not Authenticated')
            })
        })

        return user
    } catch(e) {
        redirectTo(ctx, '/login')
        return {}
    }
}

export const verifyUser = (fn:NextApiHandler) => (req:NextApiRequest, res:NextApiResponse) => {
    return new Promise<void>(resolve => {
        jwt.verify(req.cookies.auth, process.env.SIGNATURE, async (err, decoded) => {
            if(err || !decoded) {
                res.status(401).json({msg: 'YOU CANNOT PASS'})
                return resolve()
            }
            if(req.method !== 'GET') {
                req.body.jwtUser = decoded
            }
            await fn(req, res)
            return resolve()
        })
    })
}