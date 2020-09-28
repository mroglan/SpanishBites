import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import database from '../../database/database'
import {DBTimePeriod, ClientTimePeriod} from '../../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import {SecondaryLink} from '../../components/items/links'
import MainHeader from '../../components/nav/MainHeader'
import Organizer from '../../components/timePeriods/Organizer'

interface Props {
    timePeriod: ClientTimePeriod;
}

export default function TimePeriod({timePeriod}:Props) {

    if(!timePeriod || !timePeriod._id) {
        return (
            <>
                <Head>
                    <title>Resource not found!</title>
                </Head>
                <div>
                    Resource not found.
                </div>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{timePeriod.name} | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader />
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
                    Footer
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {
    const id = ctx.params.id as string
    const db = await database()
    if(!ObjectId.isValid(id)) return {props: {timePeriod: {}}}
    const timePeriod:DBTimePeriod = await db.collection('timePeriods').findOne({'_id': new ObjectId(id)})

    return {props: {timePeriod: JSON.parse(JSON.stringify(timePeriod))}, revalidate: 60}
}

export const getStaticPaths:GetStaticPaths = async () => {
    const db = await database()
    const periods:DBTimePeriod[] = await db.collection('timePeriods').find({}).toArray()

    const paths = periods.map(period => ({params: {id: period._id.toString()}}))

    console.log(paths[0])
    console.log(typeof paths[0].params.id)

    return {
        fallback: true,
        paths
    }
}