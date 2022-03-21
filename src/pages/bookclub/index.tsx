import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next'
import React from 'react'
import {ClientClubEvent, ClientCookieUser} from '../../database/dbInterfaces'
import {decodeUser} from '../../utils/auth'
import {getClubEventsForMainBookClubPage, getCurrentClubEvent} from '../../utils/clubEvents'
import styles from '../../styles/Basic.module.css'
import {parseCookies} from 'nookies'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import Main from '../../components/bookclub/Main'
import useSWR from 'swr'

interface Props {
    events: {current: ClientClubEvent; prev: ClientClubEvent[]; next: ClientClubEvent;};
}

export default function BookClub({events}:Props) {

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

    const events = await getClubEventsForMainBookClubPage()

    return {props: {events: JSON.parse(JSON.stringify(events))}, revalidate: 1800}
}