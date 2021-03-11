import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

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