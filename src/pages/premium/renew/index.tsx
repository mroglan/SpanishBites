import React from 'react'
import Head from 'next/head'
import {GetServerSideProps, GetServerSidePropsContext} from 'next'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import styles from '../../../styles/Basic.module.css'
import { ensureAuth, redirectTo } from '../../../utils/auth'
import dayjs from 'dayjs'
import Stripe from 'stripe'
import { getPaymentIntent } from '../../../utils/payments'
import { getUser } from '../../../utils/users'
import { ClientCookieUser } from '../../../database/dbInterfaces'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import Main from '../../../components/premium/renew/Main'

interface Props {
    user: ClientCookieUser;
    paymentIntent: Stripe.PaymentIntent;
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

export default function RenewPremium({user, paymentIntent}:Props) {

    return (
        <>
            <Head>
                <title>
                    Renew Spanish Bites Premium
                </title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.main}>
                   <Elements stripe={stripePromise}>
                       <Main paymentIntent={paymentIntent} user={user} /> 
                    </Elements> 
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
    
    const cookieUser = await ensureAuth(ctx, {goTo: '/premium/renew'})

    if(!cookieUser.premiumExpiration || dayjs().diff(dayjs(cookieUser.premiumExpiration)) > 0) {
        redirectTo(ctx, '/premium/purchase')
        return {props: {}}
    }

    const user = await getUser(cookieUser._id)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27'
    })    

    const paymentIntent = await getPaymentIntent(stripe, user)

    return {props: {user: cookieUser, paymentIntent}}
}