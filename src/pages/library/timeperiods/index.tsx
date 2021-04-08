import {GetStaticProps} from 'next'
import {ClientTimePeriod, ClientAuthor, ClientUnpopulatedAuthor, ClientUnpopulatedBook} from '../../../database/dbInterfaces'
import useSWR from 'swr'
import Head from 'next/head'
import styles from '../../../styles/ResourceList.module.css'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import Main from '../../../components/library/timePeriods/indexPage/Main'
import { getAllTimePeriods } from '../../../utils/timePeriods'
import {getAllUnpopulatedAuthors} from '../../../utils/authors'
import {getAllUnpopulatedBooks} from '../../../utils/books'

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientUnpopulatedAuthor[];
    books: ClientUnpopulatedBook[];
}

export default function TimePeriods({timePeriods, authors, books}:Props) {

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <>
            <Head>
                <title>Time Periods | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div>
                    <Main timePeriods={timePeriods} authors={authors} books={books} />
                </div>
                <div>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const [timePeriods, authors, books] = await Promise.all([getAllTimePeriods(), getAllUnpopulatedAuthors(), getAllUnpopulatedBooks()])

    return {props: {timePeriods, authors, books}, revalidate: 1800}
}