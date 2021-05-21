import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import {DBBook, ClientBook} from '../../../database/dbInterfaces'
import {client} from '../../../database/fauna-db'
import {query as q} from 'faunadb'
import useSWR from 'swr'
import axios from 'axios'
import {getBook} from '../../../utils/books'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import {SecondaryLink} from '../../../components/items/links'
import {BulletList} from '../../../components/items/lists'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import TextDisplay from '../../../components/mui-rte/TextDisplay'
import ResourceNotFound from '../../../components/error/ResourceNotFound'
import Main from '../../../components/library/books/indiv/Main'

interface Props {
    book: ClientBook;
}

export default function Book({book}:Props) {

    if(!book || !book._id) {
        return <ResourceNotFound />
    }

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    if(user) {
        axios({
            method: 'POST',
            url: '/api/auth/userinfo/add-recently-viewed',
            data: {
                item: {id: book._id, type: 'books'}
            }
        })
    }

    return (
        <>
            <Head>
                <title>{book.title} | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.content}>
                    <Main book={book} />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {
    const id = ctx.params.id as string
    
    const book = await getBook(id)

    return {props: {book: JSON.parse(JSON.stringify(book || {}))}, revalidate: 1800}
}

export const getStaticPaths:GetStaticPaths = async () => {

    const books:any = await client.query(
        q.Paginate(q.Match(q.Index('all_books')))
    )

    const paths = books.data.map(book => ({params: {id: book.id}}))

    return {
        fallback: true,
        paths
    }
}