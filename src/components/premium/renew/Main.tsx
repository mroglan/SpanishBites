import React, {useState, useMemo} from 'react'
import {FormikHelpers} from 'formik'
import { ClientCookieUser } from '../../../database/dbInterfaces';
import Stripe from 'stripe'
import {useStripe, useElements} from '@stripe/react-stripe-js'
import {processPayment} from '../../../utils/payments'
import {Box, Paper, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import CardInfo from '../../forms/CardInfo'
import Success from './Success'
import NotEligableForRenewal from './NotEligableForRenewal'
import dayjs from 'dayjs'

interface Props {
    user: ClientCookieUser;
    paymentIntent: Stripe.PaymentIntent; 
}

interface FormValues {
    name: string;
    email: string;
}

export default function Main({user, paymentIntent}:Props) {

    const eligableForRenewal = useMemo(() => {
       if(dayjs(user.premiumExpiration).subtract(1, 'year').diff(dayjs()) > 0) return false
       return true 
    }, [user])

    const initialVals = {name: user.name, email: user.email}

    const stripe = useStripe()
    const elements = useElements()

    const [payError, setPayError] = useState(false)
    const [premiumError, setPremiumError] = useState(false)
    const [success, setSuccess] = useState(false)

    const onSubmit = async (vals:FormValues, actions:FormikHelpers<FormValues>) => {
        await processPayment({stripe, elements, paymentIntent}, vals, {setPayError, setPremiumError, setSuccess})
    }

    return (
        <div>
            <Box mt={3} mx={3}>
                <Box maxWidth={600} mx="auto">
                    <Paper elevation={3}>
                        <Box p={3}>
                            <Box mb={1} textAlign="center">
                                <Typography variant="h4">
                                    Premium Renewal 
                                </Typography>
                            </Box>
                            {payError && <Box mb={1} maxWidth={500} mx="auto">
                                <Alert severity="error">
                                    Card Declined   
                                </Alert> 
                            </Box>}
                            {premiumError && <Box mb={1} maxWidth={500} mx="auto">
                                <Alert severity="error">
                                    An error occured while renewing premium. 
                                    Please contact maria@spanishbit.es to renew premium. 
                                </Alert> 
                            </Box>}
                            {!eligableForRenewal ? <Box maxWidth={500} mx="auto">
                                <NotEligableForRenewal />
                            </Box> : success ? <Box maxWidth={500} mx="auto">
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