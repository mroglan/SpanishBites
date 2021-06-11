import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from 'next'
import React, {useEffect} from 'react'
import { getPostDatesForCurrentYear, getPostFromReleaseDate } from '../../../../utils/blog'
import {useRouter} from 'next/router'
import BlogPostNotFound from '../../../../components/error/BlogPostNotFound'
import useSWR from 'swr'
import Head from 'next/head'
import styles from '../../../../styles/Basic.module.css'
import { ClientBlogPost } from '../../../../database/dbInterfaces'
import MainHeader from '../../../../components/nav/MainHeader'
import MainFooter from '../../../../components/nav/MainFooter'
import Main from '../../../../components/blog/indiv/Main'

interface Props {
    post: ClientBlogPost;
}

export default function BlogPost({post}:Props) {

    if(!post || !post._id) {
        return <BlogPostNotFound />
    }

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <>
            <Head>
                <title>{post.title} | Spanish Bites Blog</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.main}>
                    <Main post={post} />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {

    try {

        const date = ctx.params.date as string

        const post = await getPostFromReleaseDate(date)

        return {props: {post}, revalidate: 1800}
    } catch(e) {
        return {props: {post: {}}}
    }
}

export const getStaticPaths:GetStaticPaths = async () => {

    const dates = await getPostDatesForCurrentYear()

    const paths = dates.map(date => ({
        params: {date}
    }))

    return {paths, fallback: true}
}