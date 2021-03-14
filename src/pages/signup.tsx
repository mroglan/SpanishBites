import React from 'react'
import Head from 'next/head'
import SimpleHeader from '../components/nav/SimpleHeader'
import Main from '../components/auth/signup/Main'
import MainFooter from '../components/nav/MainFooter'
import styles from '../styles/Basic.module.css'

export default function SignUp() {

    return (
        <>
            <Head>
                <title>Sign up for Spanish Bites</title>
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