import { GetStaticPaths, GetStaticProps } from "next";
import database from '../../../database/database'
import {DBAuthor, ClientAuthor} from '../../../database/dbInterfaces'
import {getAllAuthors} from '../../../utils/authors'
import styles from '../../styles/ResourceList.module.css'
import Head from 'next/head'
import Link from 'next/link'
import MainHeader from '../../../components/nav/MainHeader'
import useSWR from 'swr'
import Main from '../../../components/authors/indexPage/Main'

interface Props {
    authors: ClientAuthor[];
}

export default function Authors({authors:dbAuthors}:Props) {

    const {data: {authors}} = useSWR(`/api/authors`, {initialData: {authors: dbAuthors}})

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
                    <Main authors={authors} />
                </div>
                <div>
                    footer
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const authors = await getAllAuthors()

    return {props: {authors: JSON.parse(JSON.stringify(authors))}, revalidate: 60}
}