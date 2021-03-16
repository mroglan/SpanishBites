import React from 'react'
import {Grid, Paper, Box, Typography, FormGroup, TextField, Button} from '@material-ui/core'
import {Form, Formik, Field, useField, ErrorMessage} from 'formik'
import {FormikTextField} from './FormikFields'
import {object, string, number, boolean, array, mixed, ref} from 'yup'
import styles from '../../styles/Forms.module.css'
import {BluePrimaryButton, BlueDenseButton} from '../items/buttons'

interface Props {
    vals: {
        password: string;
    };
    onSubmit: (vals, actions) => void;
}

export default function Signup({vals, onSubmit}:Props) {

    const initialValues = {...vals}

    const inputProps = {classes: {root: styles.input, error: styles['error-input']}}
    const inputLabelProps = {classes: {root: styles['text-field'], error: styles['error-label']}}
    const formHelperTextProps = {classes: {root: styles['helper-text'], error: styles['helper-text-error']}}

    return (
        <Box>
            <Formik validationSchema={ object({
                password: string().required('Please enter a password.').min(8).max(128)
            })} initialValues={initialValues} onSubmit={(values, actions) => onSubmit(values, actions)}>
                {({values, errors, isSubmitting, isValidating}) => (
                    <Form>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="password" label="password" type="password" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box mt={4}>
                            <BlueDenseButton type="submit" style={{minWidth: 200}} disabled={isSubmitting || isValidating} variant="contained">
                                Reset
                            </BlueDenseButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}   