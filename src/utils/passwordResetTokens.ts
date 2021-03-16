import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const createToken = async (token:string, email:string) => {

    await client.query(
        q.Create(q.Collection('passwordResetTokens'), {data: {token, email}})
    )
}

export const getTokenWithEmail = async (email:string) => {

    const token:any = await client.query(
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