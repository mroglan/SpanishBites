import {NextApiRequest, NextApiResponse} from 'next'
import Stripe from 'stripe'
import { getPaymentIntents } from '../../../utils/payments'
import { getUser, addPremium} from '../../../utils/users'
import {verifyUser} from '../../../utils/auth'

export default verifyUser(async function AddPremium(req:NextApiRequest, res:NextApiResponse) {

    try { 

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2020-08-27'
        })        

        const user = await getUser(req.body.jwtUser._id)

        const paymentIntents = await getPaymentIntents(stripe, user)

        if(!paymentIntents?.data?.length) {
            return res.status(400).json({msg: 'ok...'})
        }

        if(paymentIntents.data[0].status !== 'succeeded') {
            return res.status(400).json({msg: 'Please pay bro'})
        }

        if(paymentIntents.data[0].id !== req.body.paymentIntentId) {
            return res.status(400).json({msg: 'Payment intents not matching'})
        }

        await addPremium(user._id)

        return res.status(200).json({msg: 'added premium'})
    } catch(e) {
        console.log(e)
        return res.status(500).json({msg: 'Internal server error'})
    }
})