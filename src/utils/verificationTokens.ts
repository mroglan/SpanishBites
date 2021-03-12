import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

interface UserInfo {
    name: string;
    email: string;
    password: string;
}

export const createToken = async (token:string, userInfo:UserInfo) => {

    await client.query(
        q.Create(q.Collection('verificationTokens'),  {data: {token, userInfo}})
    )
}

export const isTokenWithEmail = async (email:string) => {

    return await client.query(
        q.If(
            q.Exists(q.Match(q.Index('verificationTokens_by_user_email'), email)),
            true,
            false
        )
    )
}