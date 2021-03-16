import React from 'react'
import {Grid, Paper, Box, Typography, FormGroup, TextField, Button} from '@material-ui/core'
import {Form, Formik, Field, useField, ErrorMessage} from 'formik'
import {FormikTextField, FormikPasswordField} from './FormikFields'
import {object, string, number, boolean, array, mixed, ref} from 'yup'
import styles from '../../styles/Forms.module.css'
import {BluePrimaryButton, BlueDenseButton} from '../items/buttons'

interface Props {
    vals: {
        email: string;
    };
    onSubmit: (vals, actions) => void;
}

export default function Signup({vals, onSubmit}:Props) {

    const initialValues = {...vals, password: ''}

    const inputProps = {classes: {root: styles.input, error: styles['error-input']}}
    const inputLabelProps = {classes: {root: styles['text-field'], error: styles['error-label']}}
    const formHelperTextProps = {classes: {root: styles['helper-text'], error: styles['helper-text-error']}}

    return (
        <Box>
            <Formik validationSchema={ object({
                email: string().required('Please enter your email.').email('Please enter a valid email.'),
                password: string().required('Please enter your password.')
            })} initialValues={initialValues} onSubmit={(values, actions) => onSubmit(values, actions)}>
                {({values, errors, isSubmitting, isValidating}) => (
                    <Form>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="email" label="Email" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <FormikPasswordField name="password" type="password" label="Password" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box mt={4}>
                            <BlueDenseButton type="submit" style={{minWidth: 200}} disabled={isSubmitting || isValidating} variant="contained">
                                Login
                            </BlueDenseButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}   