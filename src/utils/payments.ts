import React, {Dispatch, SetStateAction} from 'react'
import {ClientCookieUser, OrganizedDBUser} from '../database/dbInterfaces'
import Stripe from 'stripe'
import {StripeElements} from '@stripe/stripe-js'
import {addCustomerId} from './users'
import axios from 'axios'
import {CardElement} from '@stripe/react-stripe-js'

export const getCustomerId = async (stripe:Stripe, user:OrganizedDBUser) => {

    if(user.customerId) {
        return user.customerId
    }

    const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
    })
    
    await addCustomerId(user._id, customer.id)
    
    return customer.id
}

export async function getPaymentIntent(stripe:Stripe, user:OrganizedDBUser) {

    const cusId = await getCustomerId(stripe, user)

    const paymentIntents = await stripe.paymentIntents.list({
        customer: cusId
    })

    if(paymentIntents.data.length && paymentIntents.data[0].status === 'requires_payment_method') {
        return paymentIntents.data[0]
    }

    return await stripe.paymentIntents.create({
        amount: 2999,
        currency: 'USD',
        customer: cusId,
        description: 'Spanish Bites Premium'
    })
}

export async function getPaymentIntents(stripe:Stripe, user:OrganizedDBUser) {

    if(!user.customerId) {
        return null
    }

    return await stripe.paymentIntents.list({
        customer: user.customerId
    })
}

interface ProcessPaymentStates{
    setPayError: Dispatch<SetStateAction<boolean>>;
    setPremiumError: Dispatch<SetStateAction<boolean>>;
    setSuccess: Dispatch<SetStateAction<boolean>>;
}

interface ProcessPaymentBase {
    stripe: any;
    elements: StripeElements;
    paymentIntent: Stripe.PaymentIntent;
}

interface ProcessPaymentVals {
    name: string;
    email: string;
}

export async function processPayment({stripe, elements, paymentIntent}:ProcessPaymentBase, vals:ProcessPaymentVals,
     type:string, states:ProcessPaymentStates) {

        const {error, paymentIntent:resPaymentIntent} = await stripe.confirmCardPayment(paymentIntent.client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: vals.name,
                    email: vals.email
                }
            },
        })

        if(error) {
            states.setPayError(true)
            return
        }

        try {
            
            await axios({
                method: 'POST',
                url: `/api/premium/${type}`,
                data: {paymentIntentId: resPaymentIntent.id }
            })
            
        } catch(e) {
            states.setPremiumError(true)
            return
        }

        states.setSuccess(true)
}