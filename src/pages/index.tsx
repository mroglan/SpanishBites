import React from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Box} from '@material-ui/core'
import MainHeader from '../components/nav/MainHeader'
import MainSideBar from '../components/nav/MainSideNav'
import MainFooter from '../components/nav/MainFooter'
import FirstBanner from '../components/home/FirstBanner'
import Library from '../components/home/Library'

export default function Home() {

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
                {/* <div className={styles['side-bar']}>
                    <MainSideBar />
                </div> */}
                <div className={styles.main}>
                    <Library />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}