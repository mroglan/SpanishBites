import dayjs from 'dayjs'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import {DBBlogPost, Ref, BlogPostDate, BlogPost} from '../database/dbInterfaces'

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

export const getInitialRecentBlogPosts = async () => {

    const date = dayjs().format('YYYY-MM-DD')

    const laterPosts:{data:BlogPostDate[]} = await client.query(
        q.Filter(q.Paginate(q.Match(q.Index('all_blogPosts_by_date'))), q.Lambda('doc', q.LT(q.Date(date), q.Select(0, q.Var('doc')))))
    )

    const farDate = dayjs('3500').format('YYYY-MM-DD')

    const closestPost:BlogPostDate = laterPosts.data.length > 0 ? await client.query(
        q.Reduce(
            q.Lambda((oldest, currentPost) => q.If(
                q.LT(q.Select(0, q.Var('currentPost')), q.Select(0, q.Var('oldest'))), 
                q.Var('currentPost'),
                q.Var('oldest'),
            )),
            [q.Date(farDate), null],
            laterPosts.data
        )
    ) : undefined

    const releasedPosts:{data:BlogPostDate[]} = await client.query(
        q.Paginate(q.Match(q.Index('all_blogPosts_by_date')), {size: 11, after: closestPost})
    )

    if(closestPost) releasedPosts.data.splice(0, 1)

    const posts:DBBlogPost[] = await client.query(
        q.Map(releasedPosts.data, q.Lambda('item', q.Get(q.Select(1, q.Var('item')))))
    )

    return posts.map(post => ({...post.data, _id: post.ref.id}))
}

export const loadMoreBlogPosts = async (after:BlogPostDate) => {

    const dates:{data:BlogPostDate[]} = await client.query(
        q.Paginate(q.Match(q.Index('all_blogPosts_by_date')), {size: 11, after})
    )

    dates.data.splice(0, 1)

    const posts:DBBlogPost[] = await client.query(
        q.Map(dates.data, q.Lambda('item', q.Get(q.Select(1, q.Var('item')))))
    )

    return posts.map(post => ({...post.data, _id: post.ref.id}))
}