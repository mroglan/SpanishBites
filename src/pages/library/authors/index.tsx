import { GetStaticPaths, GetStaticProps } from "next";
import {DBAuthor, ClientAuthor} from '../../../database/dbInterfaces'
import {getAllAuthors} from '../../../utils/authors'
import styles from '../../../styles/ResourceList.module.css'
import Head from 'next/head'
import Link from 'next/link'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import useSWR from 'swr'
import Main from '../../../components/library/authors/indexPage/Main'

interface Props {
    authors: ClientAuthor[];
}

export default function Authors({authors}:Props) {

    return (
        <>
            <Head>
                <title>Authors | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div>
                    <MainHeader bg="none" />
                </div>
                <div>
                    <Main authors={authors} />
                </div>
                <div>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const authors = await getAllAuthors()

    return {props: {authors}, revalidate: 1800}
}