import { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from 'next'
import React from 'react'
import {ClientClubEvent, ClientCookieUser} from '../../database/dbInterfaces'
import {decodeUser} from '../../utils/auth'
import {getCurrentClubEvent} from '../../utils/clubEvents'
import styles from '../../styles/Basic.module.css'
import {parseCookies} from 'nookies'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import Main from '../../components/bookclub/Main'

interface Props {
    event: ClientClubEvent | null;
}

export default function BookClub({event}:Props) {

    return (
        <div className={styles.root}>
            <div className={`${styles.header} ${styles.sticky}`}>
                <MainHeader bg="none" />
            </div>
            <div className={styles.main}>
                <Main event={event} />
            </div>
            <div className={styles.footer}>
                <MainFooter />
            </div>
        </div>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const event = await getCurrentClubEvent()

    return {props: {event: JSON.parse(JSON.stringify(event))}, revalidate: 1800}
}