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