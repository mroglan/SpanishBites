import React from 'react'
import Head from 'next/head'
import SimpleHeader from '../components/nav/SimpleHeader'
import MainFooter from '../components/nav/MainFooter'
import styles from '../styles/Basic.module.css'
import Main from '../components/auth/login/Main'

export default function Login() {

    return (
        <>
            <Head>
                <title>Login to Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <SimpleHeader bg="none" />
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