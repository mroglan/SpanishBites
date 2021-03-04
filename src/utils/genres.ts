import {Genre} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getAllGenres = async () => {

    const genres:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_genres'))), q.Lambda('ref', q.Get(q.Var('ref'))))
    )

    return genres.data.map(g => ({...g.data, _id: g.ref.id}))
}