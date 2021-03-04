import {DBBook} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getAllUnpopulatedBooks = async () => {

    const books:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_books')), {size: 1000}), (ref) => q.Get(ref))
    )

    return books.data.map(d => ({...d.data, _id: d.ref.id, timePeriod: d.data.timePeriod?.id || '', genres: d.data.genres.map(g => g?.id || ''),
        authors: d.data.authors.map(a => a?.id || '')
    }))
}

export const getAllBooks = async () => {

    const books:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_books')), {size: 1000}), 
            q.Lambda('bookRef', q.Let(
                {bookDoc: q.Get(q.Var('bookRef'))}, 
                q.Merge(
                    q.Select(['data'], q.Var('bookDoc')), 
                    [
                        {_id: q.Select(['ref', 'id'], q.Var('bookDoc'))},
                        {authors: q.Map(q.Select(['data', 'authors'], q.Var('bookDoc')), q.Lambda('authorRef', q.If(
                            q.Exists(q.Ref(q.Collection('authors'), q.Select(['id'], q.Var('authorRef')))),
                            q.Merge(q.Select(['data'], q.Get(q.Var('authorRef'))), {_id: q.Select(['id'], q.Var('authorRef'))}),
                            null
                        )))}
                    ]
                )
            ))
        )
    )

    return books.data.map(d => ({...d, timePeriod: d.timePeriod?.id || '', genres: d.genres.map(g => g?.id || '')}))
}

export const getBook = async (id:string) => {

    const book:any = await client.query(
        q.Let(
            {bookDoc: q.Get(q.Ref(q.Collection('books'), id))},
            q.Merge(
                q.Select(['data'], q.Var('bookDoc')), 
                [
                    {_id: q.Select(['ref', 'id'], q.Var('bookDoc'))},
                    {authors: q.Map(q.Select(['data', 'authors'], q.Var('bookDoc')), q.Lambda('authorRef', q.If(
                        q.Exists(q.Ref(q.Collection('authors'), q.Select(['id'], q.Var('authorRef')))),
                        q.Merge(q.Select(['data'], q.Get(q.Var('authorRef'))), {_id: q.Select(['id'], q.Var('authorRef'))}),
                        null
                    )))},
                    {genres: q.Map(q.Select(['data', 'genres'], q.Var('bookDoc')), q.Lambda('genreRef', q.If(
                        q.Exists(q.Ref(q.Collection('genres'), q.Select(['id'], q.Var('genreRef')))),
                        q.Merge(q.Select(['data'], q.Get(q.Var('genreRef'))), {_id: q.Select(['id'], q.Var('genreRef'))}),
                        null
                    )))},
                    {timePeriod: q.If(
                        q.Exists(q.Ref(q.Collection('timePeriods'), q.Select(['data', 'timePeriod', 'id'], q.Var('bookDoc'), '555555555555555555'))),
                        q.Merge(q.Select(['data'], q.Get(q.Select(['data', 'timePeriod'], q.Var('bookDoc')))), {_id: q.Select(['data', 'timePeriod', 'id'], q.Var('bookDoc'))}),
                        null
                    )}
                ]
            )
        )
    )

    return book
}