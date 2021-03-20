import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { ensureAuth } from '../../utils/auth'
import styles from '../../styles/Basic.module.css'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import Main from '../../components/dashboard/Main'

export default function Dashboard({user}) {

    return (
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
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
    const user = await ensureAuth(ctx)
    return {props: {user: JSON.parse(JSON.stringify(user))}}
}