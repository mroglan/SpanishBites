import dayjs from 'dayjs'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import React from 'react'
import { ClientClubEvent } from '../../../../../database/dbInterfaces'
import { getEvent, getEventsForYear } from '../../../../../utils/clubEvents'
import useSWR from 'swr'
import styles from '../../../../../styles/Basic.module.css'
import MainHeader from '../../../../../components/nav/MainHeader'
import MainFooter from '../../../../../components/nav/MainFooter'
import Main from '../../../../../components/bookclub/books/indiv/Main'

interface Props {
    event: ClientClubEvent;
}

export default function BookInfo({event}:Props) {

    if (!event || !event._id) {
        return (
            <div>
                Hmm... We couldn't find the post you we're looking for
            </div>
        )
    }

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <div className={styles.root}>
            <div className={`${styles.header} ${styles.sticky}`}>
                <MainHeader bg="none" user={user} />
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

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {

    try {

        const year = ctx.params.year as string
        const month = ctx.params.month as string

        const event = await getEvent(month, parseInt(year))

        if (!event) {
            return {props: {event: {}}}
        }
        return {props: {event}, revalidate: 1800}
    } catch (e) {
        return {props: {event: {}}}
    }
}

export const getStaticPaths:GetStaticPaths = async () => {

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const paths = months.map(month => ({
        params: {year: dayjs().year().toString(), month}
    }))

    return {paths, fallback: true}
}