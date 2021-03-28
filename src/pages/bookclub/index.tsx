import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import {ClientCookieUser} from '../../database/dbInterfaces'
import styles from '../../styles/Basic.module.css'
import {parseCookies} from 'nookies'
import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import Main from '../../components/bookclub/Main'

interface Props {
    user: ClientCookieUser | null;
}

export default function BookClub({user}:Props) {

    return (
        <div className={styles.root}>
            <div className={`${styles.header} ${styles.sticky}`}>
                <MainHeader bg="none" user={user} />
            </div>
            <div className={styles.main}>
                <Main user={user} />
            </div>
            <div className={styles.footer}>
                <MainFooter />
            </div>
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {

    const {auth} = parseCookies(ctx)

    return {props: {user: auth || null}}
}   