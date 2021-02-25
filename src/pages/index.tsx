import React from 'react'
import Head from 'next/head'
import {GetStaticProps} from 'next'
import {getTodayBite} from '../utils/bites'
import styles from '../styles/Home.module.css'
import {ClientSpanishBite} from '../database/dbInterfaces'
import {Box} from '@material-ui/core'
import MainHeader from '../components/nav/MainHeader'
import MainSideBar from '../components/nav/MainSideNav'
import MainFooter from '../components/nav/MainFooter'
import FirstBanner from '../components/home/FirstBanner'
import Library from '../components/home/Library'

interface Props {
    bite: ClientSpanishBite;
}

export default function Home({bite}:Props) {

    return (
        <>
            <Head>
                <title>Spanish Bites: The Best of Spanish Literature</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="hsl(50, 100%, 80%)" />
                </div>
                <div className={styles['sub-ad']}>
                    <FirstBanner />
                </div>
                <div className={styles.main}>
                    <Library bite={bite} />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const bite = await getTodayBite()

    return {props: {bite: JSON.parse(JSON.stringify(bite))}, revalidate: 60}
}