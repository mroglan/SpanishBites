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

export const getTokenWithEmail = async (email:string) => {

    const token:any =  await client.query(
        q.Let(
            {tokenRef: q.Match(q.Index('verificationTokens_by_user_email'), email)},
            q.If(
                q.Exists(q.Var('tokenRef')),
                q.Get(q.Var('tokenRef')),
                null
            )
        )
    )

    return token ? {...token.data, _id: token.ref.id} : token
}

export const getTokenWithToken = async (token:string) => {

    const vToken:any = await client.query(
        q.If(
            q.Exists(q.Match(q.Index('verificationTokens_by_token'), token)),
            q.Get(q.Match(q.Index('verificationTokens_by_token'), token)),
            null
        )
    )

    return vToken ? {...vToken.data, _id: vToken.ref.id} : vToken
}

export const deleteToken = async (id:string) => {
    
    await client.query(
        q.Delete(q.Ref(q.Collection('verificationTokens'), id))
    )
}