import { GetStaticPaths, GetStaticProps } from "next";
import database from '../../database/database'
import {DBAuthor, ClientAuthor} from '../../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import useSWR from 'swr'
import {getAuthor} from '../../utils/authors'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import {SecondaryLink} from '../../components/items/links'
import {BulletList} from '../../components/items/lists'
import MainHeader from '../../components/nav/MainHeader'

interface Props {
    author: ClientAuthor;
}

export default function Author({author:dbAuthor}:Props) {

    const {data:{author}} = useSWR(`/api/authors/${dbAuthor._id}`, {initialData: {author: dbAuthor}})

    if(!author || !author._id) {
        return (
            <>
                <Head>
                    <title>Resource Not Found!</title>
                </Head>
                <div>
                    Resource not found
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{author.firstName + ' ' + author.lastName} | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader />
                </div>
                <div className={styles.content}>
                    <div className={styles['img-container']}>
                        <img src={author.image || '/no-profile.jpg'} title={author.firstName + ' ' + author.lastName} />
                    </div>
                    <div className={styles['content-container']}>
                        <Paper elevation={3}>
                            <Box px={3}>
                                <Box>
                                    <Typography variant="h3" component="h1">
                                        {author.firstName + ' ' + author.lastName}
                                    </Typography>
                                </Box>
                                <Box pt={1}>
                                    <Typography variant="h6">
                                        {author.birthDate} - {author.deathDate},{' '}
                                        <Link href="/timeperiods/[id]" as={`/timeperiods/${author.timePeriod._id}`}>
                                            <a>
                                                <SecondaryLink variant="inherit">
                                                    {author.timePeriod.name}
                                                </SecondaryLink>
                                            </a>
                                        </Link>
                                    </Typography>
                                </Box>
                                <Divider />
                                <Box pt={2}>
                                    <div className={styles['author-grid-container']}>
                                        <div>
                                            <Box pl={3} pb={1}>
                                                <Typography variant="h5">
                                                    Key Points
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <BulletList>
                                                    {author.keyPoints.map((point, i) => (
                                                        <li key={i}>
                                                            <Typography style={{maxWidth: '50ch'}} variant="body1">
                                                                {point}
                                                            </Typography>
                                                        </li>
                                                    ))}
                                                </BulletList>
                                            </Box>
                                        </div>
                                        <div>
                                            <Box pl={3} pb={1}>
                                                <Typography variant="h5">
                                                    Relevant Works
                                                </Typography>
                                            </Box>
                                            <Box>
                                                <BulletList>
                                                    {author.relevantWorks.map((work, i) => {
                                                        if(work.link) {
                                                            return (
                                                                <li key={i}>
                                                                    <a href={work.link}>
                                                                        <SecondaryLink variant="body1">
                                                                            {work.name}
                                                                        </SecondaryLink>
                                                                    </a>
                                                                </li>
                                                            )
                                                        }
                                                        return (
                                                            <li key={i}>
                                                                <Typography variant="body1">
                                                                    {work.name}
                                                                </Typography>
                                                            </li>
                                                        )
                                                    })}
                                                </BulletList>
                                            </Box>
                                        </div>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    </div>
                </div>
                <div className={styles.footer}>
                    footer
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx) => {
    const id = ctx.params.id as string
    if(!ObjectId.isValid(id)) return {props: {author: {}}}

    const author = await getAuthor(new ObjectId(id))

    return {props: {author: JSON.parse(JSON.stringify(author || {}))}, revalidate: 60}
}

export const getStaticPaths:GetStaticPaths = async() => {
    const db = await database()
    const authors:DBAuthor[] = await db.collection('authors').find({}).toArray()

    const paths = authors.map(author => ({params: {id: author._id.toString()}}))

    return {
        fallback: true,
        paths
    }
}