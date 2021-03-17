import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import styles from '../../../styles/Basic.module.css'
import Main from '../../../components/auth/verifyemail/Resend'

export default function Resend() {

    return (
        <>
            <Head>
                <title>Resend Verification Email</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" />
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