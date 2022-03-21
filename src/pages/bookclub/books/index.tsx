import dayjs from 'dayjs';
import { GetServerSideProps, GetStaticProps } from 'next';
import React from 'react'
import { ClientClubEvent } from '../../../database/dbInterfaces'
import { getEventsForYear, getStartingBookList } from '../../../utils/clubEvents';
import styles from '../../../styles/Basic.module.css'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import Main from '../../../components/bookclub/books/Main'
import useSWR from 'swr'

interface Props {
    events: ClientClubEvent[];
}

export default function Books({events}:Props) {

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <div className={styles.root}>
            <div className={`${styles.header} ${styles.sticky}`}>
                <MainHeader bg="none" user={user} />
            </div>
            <div className={styles.main}>
                <Main events={events} />
            </div>
            <div className={styles.footer}>
                <MainFooter />
            </div>
        </div>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const events = await getStartingBookList()

    return {props: {events: JSON.parse(JSON.stringify(events))}, revalidate: 1800}
}