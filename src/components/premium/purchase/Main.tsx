import React, {useState} from 'react'
import {loadStripe} from '@stripe/stripe-js'
import {Elements, useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import {Box, Typography, Paper, Step, StepLabel, Stepper} from '@material-ui/core'
import { ClientCookieUser } from '../../../database/dbInterfaces'
import CardInfo from '../../forms/CardInfo'
import {FormikHelpers} from 'formik'
import axios from 'axios'
import Stripe from 'stripe'
import {Alert} from '@material-ui/lab'
import Success from './Success'
import {processPayment} from '../../../utils/payments'

interface Props {
    user: ClientCookieUser;
    paymentIntent: Stripe.PaymentIntent;
}

interface FormValues {
    name: string;
    email: string;
}

export default function Main({user, paymentIntent}:Props) {

    const initialVals = {name: user.name, email: user.email}

    const stripe = useStripe()
    const elements = useElements()

    const [payError, setPayError] = useState(false)
    const [premiumError, setPremiumError] = useState(false)
    const [success, setSuccess] = useState(false)

    const onSubmit = async (vals:FormValues, actions:FormikHelpers<FormValues>) => {
        await processPayment({stripe, elements, paymentIntent}, vals, 'add', {setPayError, setPremiumError, setSuccess})
    }

    return (
        <div>
            <Box mt={3} mx={3}>
                <Box maxWidth={600} mx="auto">
                    <Paper elevation={3}>
                        <Box p={3}>
                            <Box mb={1} textAlign="center">
                                <Typography variant="h4">
                                    Premium Checkout
                                </Typography>
                            </Box>
                            {payError && <Box mb={1} maxWidth={500} mx="auto">
                               <Alert severity="error">
                                    Card Declined   
                                </Alert> 
                            </Box>}
                            {premiumError && <Box mb={1} maxWidth={500} mx="auto">
                               <Alert severity="error">
                                    An error occured while adding premium to your account. 
                                    Please contact maria@spanishbit.es to add premium. 
                                </Alert> 
                            </Box>}
                            {success ? <Box maxWidth={500} mx="auto">
                                <Success />
                            </Box> : <Box maxWidth={500} mx="auto">
                                <CardInfo vals={initialVals} onSubmit={onSubmit}  /> 
                            </Box>}
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </div>
    )
}