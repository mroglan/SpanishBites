import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import {DBTimePeriod, ClientTimePeriod} from '../../../database/dbInterfaces'
import {client} from '../../../database/fauna-db'
import {query as q} from 'faunadb'
import useSWR from 'swr'
import {getTimePeriod} from '../../../utils/timePeriods'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import {SecondaryLink} from '../../../components/items/links'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import Organizer from '../../../components/library/timePeriods/Organizer'
import ResourceNotFound from '../../../components/error/ResourceNotFound'

interface Props {
    timePeriod: ClientTimePeriod;
}

export default function TimePeriod({timePeriod}:Props) {

    if(!timePeriod || !timePeriod._id) {
        return <ResourceNotFound />
    }

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <>
            <Head>
                <title>{timePeriod.name} | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div>
                    <Box textAlign="center">
                        <Typography variant="h2" component="h1">
                            {timePeriod.name}
                        </Typography>
                    </Box>
                    <Box pt={2}>
                        <Organizer spainEvents={timePeriod.spainEvents} worldEvents={timePeriod.worldEvents} />
                    </Box>
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {
    try {
        const id = ctx.params.id as string

        const timePeriod = await getTimePeriod(id)

        return {props: {timePeriod: timePeriod}, revalidate: 1800}
    } catch(e) {
        return {props: {timePeriod: {}}}
    }
}

export const getStaticPaths:GetStaticPaths = async () => {

    const periods:any = await client.query(
        q.Paginate(q.Match(q.Index('all_timePeriods')))
    )

    const paths = periods.data.map(period => ({params: {id: period.id}}))

    return {
        fallback: true,
        paths
    }
}