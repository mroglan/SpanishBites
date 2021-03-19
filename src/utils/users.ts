import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import {NextApiRequest} from 'next'
import jwt from 'jsonwebtoken'

interface UserInfo {
    name: string;
    password: string;
    email: string;
}

export const isUserWithEmail = async (email:string) => {

    return await client.query(
        q.If(
            q.Exists(q.Match(q.Index('users_by_email'), email)),
            true,
            false
        )
    )
}

export const isUserWithUsername = async (username:string) => {

    return await client.query(
        q.If(
            q.Exists(q.Match(q.Index('users_by_username'), username)),
            true, 
            false
        )
    )
}

const getRandomDigits = () => Math.floor(Math.random() * 1000000)

const findUniqueUsername = async (name:string) => {

    const noSpaceUsername = name.split(' ').join('_')

    let newUsername = noSpaceUsername + getRandomDigits().toString()

    while(await isUserWithUsername(newUsername)) {
        newUsername = noSpaceUsername + getRandomDigits().toString()
    }

    return newUsername
}

export const createUser = async (info:UserInfo) => {

    const username = await findUniqueUsername(info.name)

    const data = {...info, username, isAdmin: false, isVerified: true, premiumExpiration: '', previews: [], recentlyViewed: []}

    await client.query(
        q.Create(q.Collection('users'), {data})
    )
}

export const getUserFromEmail = async (email:string) => {

    const user:any = await client.query(
        q.Let(
            {userRef: q.Match(q.Index('users_by_email'), email)},
            q.If(
                q.Exists(q.Var('userRef')),
                q.Get(q.Var('userRef')),
                null
            )
        )
    )

    return user ? {...user.data, _id: user.ref.id} : user
}

export const updateUserPassword = async (id:string, password:string) => {

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {password}})
    )
}

export async function getUserFromApi(req:NextApiRequest) {

    try {

        const user = await new Promise((res, rej) => {
            jwt.verify(req.cookies.auth, process.env.SIGNATURE, (err, decoded) => {
                if(!err && decoded) res(decoded)
                rej('Not Signed In')
            })
        })

        return user
    } catch(e) {
        return null
    }
}