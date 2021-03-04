import {DBPassage} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getAllPassages = async () => {

    const passages:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_passages')), {size: 1000}), q.Lambda(['passageRef'], q.Let(
            {passageDoc: q.Get(q.Var('passageRef'))},
            q.Merge(
                q.Select(['data'], q.Var('passageDoc')),
                [
                    {_id: q.Select(['ref', 'id'], q.Var('passageDoc'))},
                    {book: q.If(
                        q.Exists(q.Ref(q.Collection('books'), q.Select(['data', 'book', 'id'], q.Var('passageDoc'), '555555555555555555'))),
                        q.Merge(q.Select(['data'], q.Get(q.Select(['data', 'book'], q.Var('passageDoc')))), {_id: q.Select(['data', 'book', 'id'], q.Var('passageDoc'))}),
                        null
                    )},
                    {authors: q.Map(q.Select(['data', 'authors'], q.Var('passageDoc')), q.Lambda('authorRef', q.If(
                        q.Exists(q.Ref(q.Collection('authors'), q.Select(['id'], q.Var('authorRef')))),
                        q.Merge(q.Select(['data'], q.Get(q.Var('authorRef'))), {_id: q.Select(['id'], q.Var('authorRef'))}),
                        null
                    )))}
                ]
            )
        )))
    )

    return passages.data.map(d => {
        delete d.annotations
        delete d.commentary
        return d
    })
}

export const getPassage = async (id:string) => {

    const passage:any = await client.query(
        q.Let(
            {passageDoc: q.Get(q.Ref(q.Collection('passages'), id))},
            q.Merge(
                q.Select(['data'], q.Var('passageDoc')),
                [
                    {_id: q.Select(['ref', 'id'], q.Var('passageDoc'))},
                    {book: q.If(
                        q.Exists(q.Ref(q.Collection('books'), q.Select(['data', 'book', 'id'], q.Var('passageDoc'), '555555555555555555'))),
                        q.Let(
                            {bookDoc: q.Get(q.Select(['data', 'book'], q.Var('passageDoc')))},
                            q.Merge(
                                q.Select(['data'], q.Var('bookDoc')), 
                                [
                                    {_id: q.Select(['ref', 'id'], q.Var('bookDoc'))},
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
                        ),
                        null
                    )},
                    {authors: q.Map(q.Select(['data', 'authors'], q.Var('passageDoc')), q.Lambda('authorRef', q.If(
                        q.Exists(q.Ref(q.Collection('authors'), q.Select(['id'], q.Var('authorRef')))),
                        q.Merge(q.Select(['data'], q.Get(q.Var('authorRef'))), {_id: q.Select(['id'], q.Var('authorRef'))}),
                        null
                    )))}
                ]
            )
        )
    )

    return passage
}