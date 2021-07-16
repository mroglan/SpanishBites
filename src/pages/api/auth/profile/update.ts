import React from 'react'
import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../../utils/auth'
import {isUserWithUsername, updateBasicUserInfo} from '../../../../utils/users'
import jwt from 'jsonwebtoken'
import {setCookie} from 'nookies'

export default verifyUser(async function UpdateProfile(req:NextApiRequest, res:NextApiResponse) {

    try {

        if(!req.body.values) {
            throw "Nothing, nothing at all"
        }

        const {name, username} = req.body.values
        const {jwtUser} = req.body

        if(!username.match(/^[\w\-\s]+$/)) {
            return res.status(409).json({msg: 'Username must be alphanumeric.', field: 'username'})
        }

        if(!username.match(/^\S+$/)) {
            return res.status(409).json({msg: 'Username cannot contain spaces.', field: 'username'})
        }

        if(!name.match(/^[\w\-\s]+$/)) {
            return res.status(409).json({msg: 'Name must be alphanumeric', field: 'name'})
        }

        if(username !== jwtUser.username) {
            const sameUsername = await isUserWithUsername(username)
            if(sameUsername) {
                return res.status(409).json({msg: 'This username is already in use.', field: 'username'})
            }
        }

        await updateBasicUserInfo(req.body.jwtUser._id, req.body.values)

        const claims = {
            _id: jwtUser._id,
            username,
            email: jwtUser.email,
            premiumExpiration: jwtUser.premiumExpiration,
            preview: jwtUser.previews,
            image: jwtUser.image,
            name
        }

        const token = jwt.sign(claims, process.env.SIGNATURE, {expiresIn: '48hr'})

        setCookie({res}, 'auth', token, {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: true,
            maxAge: 172800,
            path: '/'
        })

        return res.status(200).json({user: claims})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})