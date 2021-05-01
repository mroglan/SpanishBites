import React from 'react'
import {Box, FormGroup, TextField, MenuItem} from '@material-ui/core'
import {Field, Form, Formik} from 'formik'
import {FormikTextField} from './FormikFields'
import {string, object} from 'yup'
import styles from '../../styles/Forms.module.css'
import {ContactMessage} from '../../database/dbInterfaces'
import {BlueDenseButton} from '../items/buttons'

interface Props {
    vals: ContactMessage;
    onSubmit: (vals, actions) => void;
}

export default function ContactUs({vals, onSubmit}:Props) {

    const inputProps = {classes: {root: styles.input, error: styles['error-input']}}
    const inputLabelProps = {classes: {root: styles['text-field'], error: styles['error-label']}}
    const formHelperTextProps = {classes: {root: styles['helper-text'], error: styles['helper-text-error']}}

    return (
        <Box>
            <Formik validationSchema={object({
                name: string().required('Please enter your name.'),
                email: string().required('Please enter your email.').email('Please enter a valid email.'),
                message: string().required('Please enter your message.')
            })} initialValues={vals} onSubmit={(vals, actions) => onSubmit(vals, actions)}>
                {({isSubmitting, isValidating}) => (
                    <Form>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="name" label="Your name" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="email" label="Your email" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <Field as={TextField} select label="Message Type" name="type">
                                    <MenuItem value="question">
                                        Question
                                    </MenuItem>
                                    <MenuItem value="bug">
                                        Website issue (or bug)
                                    </MenuItem>
                                    <MenuItem value="reccomendation">
                                        Reccomendation
                                    </MenuItem>
                                    <MenuItem value="other">
                                        Other
                                    </MenuItem>
                                </Field>
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="message" label="Message" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps}
                                multiline />
                            </FormGroup>
                        </Box>
                        <Box mt={4}>
                            <BlueDenseButton type="submit" style={{minWidth: 200}} disabled={isSubmitting || isValidating} variant="contained">
                                Send
                            </BlueDenseButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}
