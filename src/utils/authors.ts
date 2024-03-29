import {DBAuthor, DBUnpopulatedAuthor, OrganizedDBAuthor} from '../database/dbInterfaces'
import { client } from '../database/fauna-db'
import {query as q} from 'faunadb'

const populateAuthorDoc = (doc) => {
    return q.Merge(
        q.Select(['data'], doc),
        [
            {timePeriod: q.If(
                q.Exists(q.Ref(q.Collection('timePeriods'), q.Select(['data', 'timePeriod', 'id'], doc, '555555555555555555'))),
                q.Merge(q.Select(['data'], q.Get(q.Select(['data', 'timePeriod'], doc))), {_id: q.Select(['data', 'timePeriod', 'id'], doc)}),
                null
            )},
            {_id: q.Select(['ref', 'id'], doc)}
        ]
    )
}

export const getAllAuthors = async () => {

    const authors:{data: OrganizedDBAuthor[]} = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_authors')), {size: 1000}),
            q.Lambda('authorRef', q.Let(
                {authorDoc: q.Get(q.Var('authorRef'))},
                populateAuthorDoc(q.Var('authorDoc'))
            ))
        )
    )
    
    return authors.data.map(a => {
        delete a.detailedInfo
        return a
    })
}

export const getAllUnpopulatedAuthors = async () => {

    const authors:{data: DBUnpopulatedAuthor[]} = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_authors')), {size: 1000}), (ref) => q.Get(ref))
    )

    return authors.data.map(d => {
        delete d.data.detailedInfo
        return ({...d.data, _id: d.ref.id, timePeriod: d.data.timePeriod?.id || ''})
    })
}

export const getAuthor = async (id:string) => {

    const author:OrganizedDBAuthor = await client.query(
        q.Let(
            {authorDoc: q.Get(q.Ref(q.Collection('authors'), id))},
            populateAuthorDoc(q.Var('authorDoc'))
        )
    )

    delete author.detailedInfo

    return author
}

export const getPremiumInfo = async (id:string) => {

    const author:DBUnpopulatedAuthor = await client.query(
        q.Get(q.Ref(q.Collection('authors'), id))
    )

    return {detailedInfo: author.data.detailedInfo}
}