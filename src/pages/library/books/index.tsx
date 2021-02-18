import {GetStaticProps} from 'next'
import {AuthorPopulatedClientBook} from '../../../database/dbInterfaces'
import {getAllBooks} from '../../../utils/books'
import styles from '../../../styles/ResourceList.module.css'
import Head from 'next/head'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import useSWR from 'swr'
import Main from '../../../components/library/books/indexPage/Main'

interface Props {
    books: AuthorPopulatedClientBook[];
}

export default function Books({books:dbBooks}:Props) {

    const {data: {books}} = useSWR('/api/books', {initialData: {books: dbBooks}})

    return (
        <>
            <Head>
                <title>Books | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div>
                    <MainHeader bg="none" />
                </div>
                <div>
                    <Main books={books} />
                </div>
                <div>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const books = await getAllBooks()

    return {props: {books: JSON.parse(JSON.stringify(books))}, revalidate: 60}
}