import {GetStaticProps} from 'next'
import {ClientTimePeriod, ClientAuthor, ClientUnpopulatedAuthor} from '../../../database/dbInterfaces'
import useSWR from 'swr'
import Head from 'next/head'
import styles from '../../../styles/ResourceList.module.css'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import Main from '../../../components/library/timePeriods/indexPage/Main'
import { getAllTimePeriods } from '../../../utils/timePeriods'
import {getAllAuthors, getAllUnpopulatedAuthors} from '../../../utils/authors'

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientUnpopulatedAuthor[];
}

export default function TimePeriods({timePeriods:dbTimePeriods, authors:dbAuthors}:Props) {

    const {data: {timePeriods}} = useSWR('/api/timeperiods', {initialData: {timePeriods: dbTimePeriods}})

    const {data: {authors}} = useSWR('/api/authors/unpopulated', {initialData: {authors:dbAuthors}})

    return (
        <>
            <Head>
                <title>Time Periods | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" />
                </div>
                <div>
                    <Main timePeriods={timePeriods} authors={authors} />
                </div>
                <div>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const [timePeriods, authors] = await Promise.all([getAllTimePeriods(), getAllUnpopulatedAuthors()])

    return {props: {timePeriods: timePeriods, authors: authors}, revalidate: 1800}
}