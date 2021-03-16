import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import styles from '../../styles/Basic.module.css'
import NoToken from '../../components/auth/forgotpassword/NoToken'

export default function ForgotPassword() {

    const {query: {token}} = useRouter()

    return (
        <>
            <Head>
                <title>Forgot Password?</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" />
                </div>
                <div className={styles.main}>
                    {token ? '' : <NoToken />}
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}