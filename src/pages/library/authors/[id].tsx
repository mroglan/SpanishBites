import { GetStaticPaths, GetStaticProps } from "next";
import {DBAuthor, ClientAuthor} from '../../../database/dbInterfaces'
import {client} from '../../../database/fauna-db'
import {query as q} from 'faunadb'
import useSWR from 'swr'
import {getAuthor} from '../../../utils/authors'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import {SecondaryLink} from '../../../components/items/links'
import {BulletList} from '../../../components/items/lists'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import ResourceNotFound from '../../../components/error/ResourceNotFound'
import axios from 'axios'
import Main from '../../../components/library/authors/indiv/Main'

interface Props {
    author: ClientAuthor;
}

export default function Author({author}:Props) {

    if(!author || !author._id) {
        return <ResourceNotFound />
    }

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    if(user) {
        axios({
            method: 'POST',
            url: '/api/auth/userinfo/add-recently-viewed',
            data: {
                item: {id: author._id, type: 'authors'}
            }
        })
    }

    return (
        <>
            <Head>
                <title>{author.firstName + ' ' + author.lastName} | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.content}>
                    <Main author={author} user={user}/>
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx) => {

    try {
        const id = ctx.params.id as string

        const author = await getAuthor(id)

        return {props: {author}, revalidate: 1800}
    } catch(e) {
        return {props: {author: {}}}
    }
}

export const getStaticPaths:GetStaticPaths = async() => {

    const authors:any = await client.query(
        q.Paginate(q.Match(q.Index('all_authors')))
    )

    const paths = authors.data.map(author => ({params: {id: author.id}}))

    return {
        fallback: true,
        paths
    }
}