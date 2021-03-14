import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

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

    const data = {...info, username, isAdmin: false, isVerified: true, premiumExpiration: '', previews: []}

    await client.query(
        q.Create(q.Collection('users'), {data})
    )
}

export const getUserFromEmail = async (email:string) => {

    const user:any = await client.query(
        q.If(
            q.Exists(q.Match(q.Index('users_by_email'), email)),
            q.Get(q.Match(q.Index('users_by_email'), email)),
            null
        )
    )

    return user ? {...user.data, _id: user.ref.id} : user
}