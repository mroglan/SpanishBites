import React from 'react'
import Head from 'next/head'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import Main from '../../../components/premium/purchase/Main'
import styles from '../../../styles/Basic.module.css'
import useSWR from 'swr'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { ensureAuth } from '../../../utils/auth'
import { ClientCookieUser } from '../../../database/dbInterfaces'
import Stripe from 'stripe'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import { parseCookies, setCookie } from 'nookies'
import { getPaymentIntent } from '../../../utils/payments'
import { getUser } from '../../../utils/users'

interface Props {
    user: ClientCookieUser;
    paymentIntent: Stripe.PaymentIntent;
}

const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

export default function PurchasePremium({user, paymentIntent}:Props) {

    return (
        <>
            <Head>
                <title>
                    Spanish Bites Premium
                </title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div className={styles.main}>
                    <Elements stripe={stripePromise}>
                        <Main user={user} paymentIntent={paymentIntent}/>
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

    const cookieUser:ClientCookieUser = await ensureAuth(ctx, {goTo: '/premium/purchase'})

    const user = await getUser(cookieUser._id)

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: '2020-08-27'
    })
    const paymentIntent = await getPaymentIntent(stripe, user)

   return {props: {user: cookieUser, paymentIntent}} 
}