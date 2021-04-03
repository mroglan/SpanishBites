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
                    <div className={styles['img-container']}>
                        <img src={book.image || '/no-profile.jpg'} title={book.title} />
                    </div>
                    <div className={styles['content-container']}>
                        <Paper elevation={3}>
                            <Box px={3}>
                                <Box>
                                    <Typography variant="h3" component="h1">
                                        {book.title}
                                    </Typography>
                                </Box>
                                <Box pt={1}>
                                    <Typography variant="h6">
                                        By {book.authors.map((author, i) => (
                                            <Link key={i} href="/library/authors/[id]" as={`/library/authors/${author._id}`}>
                                                <a>
                                                    <SecondaryLink variant="inherit">
                                                        {author.firstName + ' ' + author.lastName}
                                                        {i + 1 < book.authors.length ? ', ' : ''}
                                                    </SecondaryLink>
                                                </a>
                                            </Link>
                                        ))}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider />
                            <Box px={3} pt={2}>
                                <Box>
                                    <Typography variant="h6">
                                        Time Period: <Link href="/library/timeperiods/[id]" as={`/library/timeperiods/${book.timePeriod._id}`}>
                                            <a>
                                                <SecondaryLink variant="inherit">
                                                    {book.timePeriod.name}
                                                </SecondaryLink>
                                            </a>
                                        </Link>
                                    </Typography>
                                </Box>
                                <Box pt={1}>
                                    <Typography variant="h6">
                                        Genre: {book.genres.map((genre, i) => (
                                            <Link key={i} href="/library/genres/[id]" as={`/library/genres/${genre._id}`}>
                                                <a>
                                                    <SecondaryLink variant="inherit">
                                                        {genre.name}
                                                        {i + 1 < book.genres.length ? ', ' : ''}
                                                    </SecondaryLink>
                                                </a>
                                            </Link>
                                        ))}
                                    </Typography>
                                </Box>
                                <Box pt={1}>
                                    <Box maxWidth="90ch">
                                        <TextDisplay text={book.desc} />
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    </div>
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