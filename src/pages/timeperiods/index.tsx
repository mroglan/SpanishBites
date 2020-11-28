import {GetStaticProps} from 'next'
import {ClientTimePeriod} from '../../database/dbInterfaces'
import useSWR from 'swr'
import Head from 'next/head'
import styles from '../../styles/ResourceList.module.css'
import MainHeader from '../../components/nav/MainHeader'
import Main from '../../components/timePeriods/indexPage/Main'
import { getAllTimePeriods } from '../../utils/timePeriods'

interface Props {
    timePeriods: ClientTimePeriod[];
}

export default function TimePeriods({timePeriods:dbTimePeriods}:Props) {

    const {data: {timePeriods}} = useSWR('/api/timeperiods', {initialData: {timePeriods: dbTimePeriods}})

    return (
        <>
            <Head>
                <title>Time Periods | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div>
                    <MainHeader />
                </div>
                <div>
                    <Main timePeriods={timePeriods} />
                </div>
                <div>
                    footer
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const timePeriods = await getAllTimePeriods()

    return {props: {timePeriods: JSON.parse(JSON.stringify(timePeriods))}, revalidate: 60}
}