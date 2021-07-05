import {NextApiRequest, NextApiResponse} from 'next'
import {loadMoreBlogPosts} from '../../../../utils/blog'
import {query as q} from 'faunadb'
import { BlogPostDate } from '../../../../database/dbInterfaces'

export default async function LoadMore(req:NextApiRequest, res:NextApiResponse) {

    if(req.method === 'GET') {
        return res.status(400).json({msg: 'Ok...'})
    }
    
    try {

        const {afterPost} = req.body

        const after:BlogPostDate = [q.Date(afterPost[0]) as any, q.Ref(q.Collection('blogPosts'), afterPost[1]) as any]

        const posts = await loadMoreBlogPosts(after)

        return res.status(200).json(posts)
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}