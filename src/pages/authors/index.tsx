import { GetStaticPaths, GetStaticProps } from "next";
import database from '../../database/database'
import {DBAuthor, ClientAuthor} from '../../database/dbInterfaces'
import {getAllAuthors} from '../../utils/authors'
import {ObjectId} from 'mongodb'
import styles from '../../styles/ResourceList.module.css'
import Head from 'next/head'
import Link from 'next/link'
import MainHeader from '../../components/nav/MainHeader'
import useSWR from 'swr'

interface Props {
    authors: ClientAuthor[];
}

export default function Authors({authors:dbAuthors}:Props) {

    return (
        <>
            <Head>
                <title>Authors | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div>
                    <MainHeader />
                </div>
                <div>
                    display authors here.
                </div>
                <div>
                    footer
                </div>
            </div>
        </>
    )
}

/*
{authors.map(author => (
                    <Link key={author._id} href="/authors/[id]" as={`/authors/${author._id}`}>
                        <a>
                            {author.firstName} {author.lastName}<br />
                        </a>
                    </Link>
                ))}
*/

export const getStaticProps:GetStaticProps = async () => {

    const authors = await getAllAuthors()

    return {props: {authors: JSON.parse(JSON.stringify(authors))}, revalidate: 60}
}