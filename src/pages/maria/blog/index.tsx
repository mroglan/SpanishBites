import React from 'react'
import Head from 'next/head'
import { getInitialRecentBlogPosts } from '../../../utils/blog'
import {GetStaticProps} from 'next'
import useSWR from 'swr'
import styles from '../../../styles/Basic.module.css'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import Main from '../../../components/maria/blog/indexPage/Main'

export default function Blog({posts}) {

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <>
            <Head>
                <title>Maria Carmen Blog</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.main}>
                    <Main posts={posts} />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const posts = await getInitialRecentBlogPosts()

    return {props: {posts: JSON.parse(JSON.stringify(posts))}, revalidate: 1800}
}