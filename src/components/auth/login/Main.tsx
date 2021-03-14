import React from 'react'
import {Paper, Box, Typography} from '@material-ui/core'
import Login from '../../forms/Login'
import styles from '../../../styles/Forms.module.css'
import {Bite} from '../../items/bites'
import Link from 'next/link'
import {PrimaryLink, SecondaryLink} from '../../items/links'
import axios from 'axios'
import Router from 'next/router'

export default function Main() {

    const initialVals = {email: '', name: ''}

    const onSubmit = async (values, actions) => {
        try {
            await axios({
                method: 'POST',
                url: '/api/auth/login',
                data: values
            })

            Router.push({
                pathname: '/dashboard'
            })
        } catch(e) {
            if(e.response.status === 403) {
                actions.setFieldError(e.response.data.field, e.response.data.msg)
            }
            actions.setSubmitting(false)
        }
    }

    return (
        <div>
            <Box mt={5} maxWidth={600} mx="auto">
                <Bite>
                    <Paper elevation={3}>
                        <Box p={3}>
                            <Box mr={9} textAlign="">
                                <Typography className={styles['catamaran']} variant="h3" gutterBottom>
                                    Login
                                </Typography>
                            </Box>
                            <Box my={3}>
                                <Login onSubmit={onSubmit} vals={{email: ''}} />
                            </Box>
                            <Box my={2}>
                                <Link href="/auth/forgotpassword">
                                    <a>
                                        <PrimaryLink>
                                            Forgot Password?
                                        </PrimaryLink>
                                    </a>
                                </Link>
                            </Box>
                            <Box>
                                <Typography component="span" variant="body1">
                                    Need an account?{' '}
                                </Typography>
                                <Link href="/signup">
                                    <a>
                                        <PrimaryLink>
                                            Sign up
                                        </PrimaryLink>
                                    </a>
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </Bite>
            </Box>
        </div>
    )
}