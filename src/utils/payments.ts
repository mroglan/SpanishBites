import React from 'react'
import {ClientCookieUser, OrganizedDBUser} from '../database/dbInterfaces'
import Stripe from 'stripe'
import {addCustomerId} from './users'

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
        customer: cusId
    })
}