import {GetServerSidePropsContext, NextApiHandler, NextApiRequest, NextApiResponse} from 'next'
import jwt from 'jsonwebtoken'
import Router from 'next/router'
import {parseCookies} from 'nookies'
import axios from 'axios'
import dayjs from 'dayjs'

export const decodeUser = (auth:string) => {
    return new Promise((res) => {
        jwt.verify(auth, process.env.SIGNATURE, (err, decoded) => {
            if(!err && decoded) res(decoded)
            res(null)
        })
    })
}

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

export const verifyPremiumUser = (fn:NextApiHandler) => (req:NextApiRequest, res:NextApiResponse) => {
    // when adding preview functionality:
    // if user has premium, pass true for req.body.hasPremium
    // if not, pass false and then check if user has preview for item in callback function
    return new Promise<void>(resolve => {
        jwt.verify(req.cookies.auth, process.env.SIGNATURE, async (err, decoded) => {
            if(err || !decoded) {
                res.status(401).json({msg: 'YOU CANNOT PASS'})
                return resolve()
            }
            if(!decoded.premiumExpiration || dayjs(decoded.premiumExpiration).diff(dayjs(), 'day') < 0) {
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