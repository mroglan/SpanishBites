import React from 'react'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import styles from '../../styles/Basic.module.css'
import Head from 'next/head'
import useSWR from 'swr'
import Main from '../../components/premium/indexPage/Main'

export default function Premium() {

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    return (
        <>
            <Head>
                <title>Spanish Bites Premium</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header} style={{position: 'sticky', top: 0, zIndex: 2000}}>
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