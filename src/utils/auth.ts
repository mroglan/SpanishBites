import {GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'
import Router from 'next/router'
import {parseCookies} from 'nookies'
import axios from 'axios'
import dayjs from 'dayjs'
import { ClientCookieUser } from '../database/dbInterfaces'

export const decodeUser = (auth:string) => {
    return new Promise((res) => {
        jwt.verify(auth, process.env.SIGNATURE, (err, decoded) => {
            if(!err && decoded) res(decoded)
            res(null)
        })
    })
}

interface RedirectQuery {
    goTo: string;
}

export const redirectTo = (ctx:GetServerSidePropsContext, url:string, query?:RedirectQuery) => {
    if(!ctx.req) {
        Router.replace('url', {query: query ? {goTo: query.goTo} : undefined})
    } else {
        ctx.res.writeHead(302, {
            Location: `${process.env.BASE_URL}${url}?${query ? Object.entries(query)[0][0] + '=' + Object.entries(query)[0][1] : ''}`
        })
        ctx.res?.end()
    }
}

export async function ensureAuth(ctx:GetServerSidePropsContext, query?:RedirectQuery):Promise<ClientCookieUser> {
    try {
        const {auth} = parseCookies(ctx)

        const user:ClientCookieUser = await new Promise((res, rej) => {
            jwt.verify(auth, process.env.SIGNATURE, (err, decoded) => {
                if(!err && decoded) res(decoded)
                rej('Not Authenticated')
            })
        })

        return user
    } catch(e) {
        redirectTo(ctx, '/login', query)
        return null 
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

export const verifyPremiumUser = (fn:NextApiHandler) => (req:NextApiRequest, res:NextApiResponse) => {
    // when adding preview functionality:
    // check if previews from user cookies includes id
    
    return new Promise<void>(resolve => {
        jwt.verify(req.cookies.auth, process.env.SIGNATURE, async (err, decoded) => {
            if(err || !decoded) {
                res.status(401).json({msg: 'YOU CANNOT PASS'})
                return resolve()
            }
            if(!decoded.previews.find(preview => preview.id === req.query.id)) {
                if(!decoded.premiumExpiration || dayjs(decoded.premiumExpiration).diff(dayjs(), 'day') < 0) {
                    res.status(401).json({msg: 'YOU CANNOT PASS'})
                    return resolve()
                }
            }
            if(req.method !== 'GET') {
                req.body.jwtUser = decoded
            }
            await fn(req, res)
            return resolve()
        })
    })
}

export const logout = async () => {
    try {
        await axios({
            method: 'POST',
            url: '/api/auth/logout'
        })
        Router.push({
            pathname: '/login'
        })
    } catch(e) {
        console.log(e.response)
    }
}