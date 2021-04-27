import {DBPasswordResetToken, OrganizedDBPasswordResetToken} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const createToken = async (token:string, email:string, userId:string) => {

    await client.query(
        q.Create(q.Collection('passwordResetTokens'), {data: {token, email, userId}})
    )
}

export const getTokenWithEmail = async (email:string) => {

    const token:DBPasswordResetToken = await client.query(
        q.Let(
            {tokenRef: q.Match(q.Index('passwordResetTokens_by_email'), email)},
            q.If(
                q.Exists(q.Var('tokenRef')),
                q.Get(q.Var('tokenRef')),
                null
            )
        )
    )

    return token ? {...token.data, _id: token.ref.id} : token
}

export const getTokenWithToken = async (token:string):Promise<OrganizedDBPasswordResetToken|null> => {

    const passToken:DBPasswordResetToken = await client.query(
        q.Let(
            {tokenRef: q.Match(q.Index('passwordResetTokens_by_token'), token)},
            q.If(
                q.Exists(q.Var('tokenRef')),
                q.Get(q.Var('tokenRef')),
                null
            )
        )
    )

    return passToken ? {...passToken.data, _id: passToken.ref.id} : null
}

export const isTokenWithToken = async (token:string) => {

    return await client.query(
        q.If(
            q.Exists(q.Match(q.Index('passwordResetTokens_by_token'), token)),
            true,
            false
        )
    )
}

export const deleteToken = async (id:string) => {
    
    await client.query(
        q.Delete(q.Ref(q.Collection('passwordResetTokens'), id))
    )
}