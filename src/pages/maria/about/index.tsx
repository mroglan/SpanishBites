import React from 'react'
import styles from '../../../styles/Basic.module.css'
import Head from 'next/head'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import useSWR from 'swr'
import Main from '../../../components/maria/about/Main'

export default function AboutMaria() {

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <>
            <Head>
                <title>
                    About Me and Spanish Bites     
                </title> 
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.main}>
                    <Main /> 
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}