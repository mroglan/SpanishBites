import {DBUser, GeneralItem} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import {getUser} from './users'

export const getFavorites = async (id:string) => {

    const user:DBUser = await client.query(
        q.Get(q.Ref(q.Collection('users'), id))
    )

    if(!user || !user.data.favorites) return []

    return user.data.favorites
}

export const updateFavorites = async (id:string, favorites:GeneralItem[]) => {

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {favorites}})
    )
}