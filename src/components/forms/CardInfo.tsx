import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'
import {Grid, Paper, Box, Typography, FormGroup, TextField, Button} from '@material-ui/core'
import {Form, Formik, Field, useField, ErrorMessage} from 'formik'
import {FormikTextField, FormikPasswordField} from './FormikFields'
import {object, string, number, boolean, array, mixed, ref} from 'yup'
import styles from '../../styles/Forms.module.css'
import { BlueDenseButton, BluePrimaryButton } from '../items/buttons'

interface Props {
    vals: {
        name: string;
        email: string;
    };
    onSubmit: (vals, actions) => void;
}

export default function CardInfo({vals, onSubmit}:Props) {

    const initialValues = vals

    const inputProps = {classes: {root: styles.input, error: styles['error-input']}}
    const inputLabelProps = {classes: {root: styles['text-field'], error: styles['error-label']}}
    const formHelperTextProps = {classes: {root: styles['helper-text'], error: styles['helper-text-error']}}

    return (
        <Box>
            <Formik validationSchema={object({
                email: string().required('Please enter your email.').email('Please enter a valid email.'),
                name: string().required('Please enter your name.')
            })} initialValues={initialValues} onSubmit={(values, actions) => onSubmit(values, actions)}>
                {({isSubmitting, isValidating}) => (
                    <Form>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="name" label="Cardholder Name" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="email" label="Email" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={4}>
                            <CardElement options={{style: {
                                base: {
                                    fontSize: '16px'
                                }
                            }}} />
                        </Box>
                        <Box mt={4} maxWidth={200} mx="auto">
                            <BluePrimaryButton type="submit" fullWidth disabled={isSubmitting || isValidating} variant="contained">
                                Proceed
                            </BluePrimaryButton>
                        </Box>
                    </Form>
               )} 
            </Formik>
        </Box>
    )
}