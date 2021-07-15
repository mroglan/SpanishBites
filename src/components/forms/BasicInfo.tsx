import React from 'react'
import styles from '../../styles/Forms.module.css'
import {Box, FormGroup} from '@material-ui/core'
import {Field, Form, Formik} from 'formik'
import {FormikTextField} from './FormikFields'
import {string, object} from 'yup'
import { BlueDenseButton } from '../items/buttons'

interface Props {
    vals: {name:string;username:string;email:string;};
    onSubmit: (vals, actions) => void;
}

export default function BasicInfoForm({vals, onSubmit}:Props) {

    const inputProps = {classes: {root: styles.input, error: styles['error-input']}}
    const inputLabelProps = {classes: {root: styles['text-field'], error: styles['error-label']}}
    const formHelperTextProps = {classes: {root: styles['helper-text'], error: styles['helper-text-error']}}

    return (
        <Box>
            <Formik validationSchema={object({
                name: string().required('Please enter a name.').matches(/^[\w\-\s]+$/, {message: 'Name must be alphanumeric.'}),
                username: string().required('Please enter a valid username').matches(/^[\w\-\s]+$/, {message: 'Username must be alphanumeric.'})
                .matches(/^\S+$/, {message: 'Username cannot contain spaces.'})
            })} initialValues={vals} onSubmit={(vals, actions) => onSubmit(vals, actions)}>
                {({isSubmitting, isValidating}) => (
                    <Form>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="email" label="Email" disabled={true} InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="name" label="Name" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box my={2}>
                            <FormGroup>
                                <FormikTextField name="username" label="Username" InputProps={inputProps}
                                InputLabelProps={inputLabelProps} FormHelperTextProps={formHelperTextProps} />
                            </FormGroup>
                        </Box>
                        <Box mt={4}>
                            <BlueDenseButton type="submit" style={{width: 200}} disabled={isSubmitting || isValidating} variant="contained">
                                Update Basic Info
                            </BlueDenseButton>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    )
}