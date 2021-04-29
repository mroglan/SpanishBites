import React, {useState} from 'react'
import {Paper, Box, Typography} from '@material-ui/core'
import styles from '../../../styles/Auth.module.css'
import {Bite} from '../../items/bites'
import Link from 'next/link'
import {PrimaryLink, SecondaryLink} from '../../items/links'
import axios from 'axios'
import Email from '../../forms/Email'
import MailOutlineIcon from '@material-ui/icons/MailOutline';

export function SuccessScreen({setSuccess}) {

    return (
        <div className={styles['main-root']}>
            <div>
                <div className={styles['main-img-container']}>
                    <img src="/auth/ink.png" />
                </div>
                <div className={styles['main-message-container']}>
                    <Box textAlign="center" mb={1}>
                        <Typography className={styles['catamaran']} variant="h3">
                            Reset Your Password
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" component="span" className={styles['catamaran']}>
                            Check your inbox for an email we just sent you. If you don't receive an email in the next few minutes{' '}
                        </Typography>
                        <PrimaryLink onClick={() => setSuccess(false)}
                         style={{cursor: 'pointer'}} className={styles['catamaran']} variant="h6">
                            resend it.
                        </PrimaryLink>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default function NoToken() {

    const [success, setSuccess] = useState(false)

    const onSubmit = async (values, actions) => {
        try {

            await axios({
                method: 'POST',
                url: '/api/auth/forgotpassword/sendemail',
                data: values
            })

            setSuccess(true)
        } catch(e) {
            if(e.response.status === 409) {
                actions.setFieldError(e.response.data.field, e.response.data.msg)
            }
            actions.setSubmitting(false)
        }
    }

    return (
        <div>
            {success ? <SuccessScreen setSuccess={setSuccess} /> : <Box mt="3rem" maxWidth={600} mx="auto">
                <Bite>
                    <Paper elevation={3}>
                        <Box p={3}>
                            <Box mr={9}>
                                <Typography className={styles['catamaran']} variant="h3" gutterBottom>
                                    Forgot Password
                                </Typography>
                            </Box>
                            <Box my={2}>
                                <Typography className={styles['catamaran']} variant="body1">
                                    Enter in your email to recieve instructions for resetting your password.
                                </Typography>
                            </Box>
                            <Box my={3}>
                                <div data-testid="email-form-container">
                                    <Email onSubmit={onSubmit} vals={{email: ''}} />
                                </div>
                            </Box>
                        </Box>
                    </Paper>
                </Bite>
            </Box>}
        </div>
    )
}