import {DBUser} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getFavorites = async (id:string) => {

    const user:DBUser = await client.query(
        q.Get(q.Ref(q.Collection('users'), id))
    )

    if(!user || !user.data.favorites) return []

    return user.data.favorites
}