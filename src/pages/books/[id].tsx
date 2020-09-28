import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import database from '../../database/database'
import {DBBook, ClientBook} from '../../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import {SecondaryLink} from '../../components/items/links'
import {BulletList} from '../../components/items/lists'
import MainHeader from '../../components/nav/MainHeader'
import TextDisplay from '../../components/mui-rte/TextDisplay'

interface Props {
    book: ClientBook;
}

export default function Book({book}:Props) {

    if(!book || !book._id) {
        return (
            <>
                <Head>
                    <title>Resource not found!</title>
                </Head>
                <div>
                    Resource not found.
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{book.title} | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader />
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
                                            <Link key={i} href="/authors/[id]" as={`/authors/${author._id}`}>
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
                                        Time Period: <Link href="/timeperiods/[id]" as={`/timeperiods/${book.timePeriod._id}`}>
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
                                            <Link key={i} href="/genres/[id]" as={`/genres/${genre._id}`}>
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
                    Footer
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {
    const id = ctx.params.id as string
    const db = await database()
    if(!ObjectId.isValid(id)) return {props: {book: {}}}
    const book:DBBook[] = await db.collection('books').aggregate([
        {$match: {'_id': new ObjectId(id)}},
        {$lookup: {
            from: 'timePeriods',
            localField: 'timePeriod',
            foreignField: '_id',
            as: 'timePeriod'
        }},
        {$unwind: '$timePeriod'},
        {$lookup: {
            from: 'authors',
            localField: 'authors',
            foreignField: '_id',
            as: 'authors'
        }},
        {$lookup: {
            from: 'genres',
            localField: 'genres',
            foreignField: '_id',
            as: 'genres'
        }}
    ]).toArray()

    return {props: {book: JSON.parse(JSON.stringify(book[0] || {}))}, revalidate: 60}
}

export const getStaticPaths:GetStaticPaths = async () => {
    const db = await database()
    const books:DBBook[] = await db.collection('books').find({}).toArray()

    const paths = books.map(book => ({params: {id: book._id.toString()}}))

    return {
        fallback: true,
        paths
    }
}