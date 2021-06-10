import dayjs from 'dayjs'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import {DBBlogPost, Ref} from '../database/dbInterfaces'

export const getPostDatesForCurrentYear = async ():Promise<string[]> => {

    const year = dayjs().year().toString()

    const posts:{data:[Ref, string][]} = await client.query(
        q.Filter(q.Paginate(q.Match(q.Index('blogPost_dates')), {size: 300}), q.Lambda('post', q.ContainsStr(q.Select(1, q.Var('post')), year)))
    )

    return posts.data.map(post => post[1])
}

export const getPostFromReleaseDate = async (date:string) => {

    const post:DBBlogPost = await client.query(
        q.Get(q.Match(q.Index('blogPosts_by_releaseDate'), date))
    )

    return {...post.data, _id: post.ref.id}
}

