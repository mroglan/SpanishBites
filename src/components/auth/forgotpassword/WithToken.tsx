import React, {useState, useReducer, useEffect} from 'react'
import {Box, Paper, Typography, CircularProgress} from '@material-ui/core'
import {Bite} from '../../items/bites'
import Password from '../../forms/Password'
import styles from '../../../styles/Auth.module.css'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {BlueDenseButton, BluePrimaryButton} from '../../items/buttons'
import axios from 'axios'
import Link from 'next/link'

interface Props {
    token: string;
}

function LoadingScreen() {

    return (
        <div className={styles['main-root']}>
            <div>
                <div className={styles['main-img-container']}>
                    <CircularProgress color="secondary" size="clamp(100px, 30vw, 300px)" />
                </div>
                <div className={styles['main-message-container']}>
                    <Box textAlign="center">
                        <Typography variant="h3" className={styles['catamaran']}>
                            Preparing your form...
                        </Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}

function FormScreen({onSubmit}) {

    return (
        <Box mt="3rem" maxWidth={600} mx="auto">
            <Bite>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Box mr={9}>
                            <Typography className={styles['catamaran']} variant="h3" gutterBottom>
                                Reset Password
                            </Typography>
                        </Box>
                        <Box my={2}>
                            <Typography className={styles['catamaran']} variant="body1">
                                Enter in your new password.
                            </Typography>
                        </Box>
                        <Box my={3}>
                            <Password onSubmit={onSubmit} vals={{password: ''}} />
                        </Box>
                    </Box>
                </Paper>
            </Bite>
        </Box>
    )
}

function TokenNotFoundScreen() {

    return (
        <div className={styles['main-root']}>
            <div>
                <div className={styles['main-img-container']}>
                    <ErrorOutlineIcon color="secondary" style={{fontSize: 'clamp(100px, 30vw, 300px)'}} />
                </div>
                <div className={styles['main-message-container']}>
                    <Box textAlign="center" mb={1}>
                        <Typography variant="h3" className={styles['catamaran']}>
                            Token not found
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" component="span" className={styles['catamaran']}>
                            We couldn't find a token for your account. If you requested a password reset over 1 day ago, you will
                            need to make a new request.
                        </Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}

function ErrorScreen() {

    return (
        <div className={styles['main-root']}>
            <div>
                <div className={styles['main-img-container']}>
                    <ErrorOutlineIcon color="secondary" style={{fontSize: 'clamp(100px, 30vw, 300px)'}} />
                </div>
                <div className={styles['main-message-container']}>
                    <Box textAlign="center" mb={1}>
                        <Typography variant="h3" className={styles['catamaran']}>
                            Oops...
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" component="span" className={styles['catamaran']}>
                            An error occured while verifying your password reset token.
                        </Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}

function SuccessScreen() {

    return (
        <div className={styles['main-root']}>
            <div>
                <div className={styles['main-img-container']}>
                    <CheckCircleOutlineIcon color="secondary" style={{fontSize: 'clamp(100px, 30vw, 300px)'}} />
                </div>
                <div className={styles['main-message-container']}>
                    <Box textAlign="center" mb={1}>
                        <Typography variant="h3" className={styles['catamaran']}>
                            You're all set!
                        </Typography>
                    </Box>
                    <Box mb={2} textAlign="center">
                        <Typography variant="h6" component="span" className={styles['catamaran']}>
                            You're password has been reset.
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Link href="/login">
                            <a>
                                <BluePrimaryButton style={{minWidth: 200}}>
                                    Login
                                </BluePrimaryButton>
                            </a>
                        </Link>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default function WithToken({token}:Props) {

    const [status, setStatus] = useState({tokenError: false, serverError: false, success: false, loading: true})

    const onSubmit = async (values, actions) => {
        try {
            await axios({
                method: 'POST',
                url: '/api/auth/forgotpassword/reset',
                data: {...values, token}
            })

            setStatus({...status, success: true})
        } catch(e) {
            setStatus({...status, serverError: true})
        }
    }

    useEffect(() => {
        const verifyToken = async () => {

            try {
                await axios({
                    method: 'POST',
                    url: '/api/auth/forgotpassword/verifytoken',
                    data: {token}
                })

                setStatus({...status, loading: false})
            } catch(e) {
                if(e.response.status === 409) {
                    return setStatus({...status, loading: false, tokenError: true})
                }
                setStatus({...status, loading: false, serverError: true})
            }
        }

        verifyToken()
    }, [])

    if(status.loading) return <LoadingScreen />

    if(status.tokenError) return <TokenNotFoundScreen />

    if(status.serverError) return <ErrorScreen />

    if(status.success) return <SuccessScreen />

    return <FormScreen onSubmit={onSubmit} />
}