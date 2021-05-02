import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import {ContactMessage} from '../database/dbInterfaces'

export const addContactMessage = async (msg:ContactMessage) => {

    await client.query(
        q.Create(q.Collection('contactMessages'), {data: msg})
    )
}