import React from 'react'
import Head from 'next/head'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import {ClientCookieUser} from '../../database/dbInterfaces'
import styles from '../../styles/Basic.module.css'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import useSWR from 'swr'
import Main from '../../components/profile/indexPage/Main'
import { ensureAuth } from '../../utils/auth'

interface Props {
    user: ClientCookieUser;
}

export default function Profile({user:initialUser}:Props) {

    const {data:user} = useSWR('/api/auth/getuser', {initialData: initialUser})

    return (
        <>
            <Head>
                <title>Your Profile | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.main}>
                    <Main user={user} />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {

    const user = await ensureAuth(ctx)
    return {props: {user: JSON.parse(JSON.stringify(user))}}
}