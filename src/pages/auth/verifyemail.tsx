import React from 'react'
import {useRouter} from 'next/router'
import Head from 'next/head'
import SimpleHeader from '../../components/nav/SimpleHeader'
import MainFooter from '../../components/nav/MainFooter'
import styles from '../../styles/Basic.module.css'
import NoToken from '../../components/auth/verifyemail/NoToken'
import WithToken from '../../components/auth/verifyemail/WithToken'

export default function VerifyEmail() {

    const {query: {token}} = useRouter()

    return (
        <>
            <Head>
                <title>Verify Your Email</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <SimpleHeader bg="none" />
                </div>
                <div className={styles.main}>
                    {token ? <WithToken token={token as string} /> : <NoToken />}
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}