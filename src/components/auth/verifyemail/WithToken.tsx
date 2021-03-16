import React, {useState, useReducer, useEffect} from 'react'
import {Box, Paper, Typography, CircularProgress} from '@material-ui/core'
import styles from '../../../styles/Auth.module.css'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {BlueDenseButton, BluePrimaryButton} from '../../items/buttons'
import axios from 'axios'

interface Props {
    token: string;
}

function LoadingScreen() {

    return (
        <>
            <div className={styles['main-img-container']}>
                <CircularProgress color="secondary" size="clamp(100px, 30vw, 300px)" />
            </div>
            <div className={styles['main-message-container']}>
                <Box textAlign="center">
                    <Typography variant="h3" className={styles['catamaran']}>
                        Verifying account
                    </Typography>
                </Box>
            </div>
        </>
    )
}

function SuccessScreen() {

    return (
        <>
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
                        You're email has been verified and you can now login.
                    </Typography>
                </Box>
                <Box textAlign="center">
                    <BluePrimaryButton style={{minWidth: 200}}>
                        Login
                    </BluePrimaryButton>
                </Box>
            </div>
        </>
    )
}

function ErrorScreen() {

    return (
        <>
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
                        An error occured while verifying your account.
                    </Typography>
                </Box>
            </div>
        </>
    )
}

function TokenNotFoundScreen() {

    return (
        <>
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
                        We couldn't find a token for your account. If you created your account over 3 days ago, the token has
                        expired and you will need to create a new account.
                    </Typography>
                </Box>
            </div>
        </>
    )
}

function statusReducer(state, {type, payload}) {

    switch(type) {
        case 'CHANGE_VAL':
            return {...state, loading: false, [payload.item]: payload.value}
        default:
            return state
    }
}

export default function WithToken({token}:Props) {

    const [status, reducer] = useReducer(statusReducer, {loading: true, success: false, tokenNotFound: false, serverError: false})

    useEffect(() => {
        const validateToken = async () => {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/auth/verifyemail',
                    data: {
                        token
                    }
                })
                reducer({type: 'CHANGE_VAL', payload: {item: 'success', value: true}})
            } catch(e) {
                if(e.response.status === 500) {
                    reducer({type: 'CHANGE_VAL', payload: {item: 'serverError', value: true}})
                    return
                }
                reducer({type: 'CHANGE_VAL', payload: {item: 'tokenNotFound', value: true}})
            }
        }
        validateToken()
    }, [])

    return (
        <div className={styles['main-root']}>
            <div>
                {status.loading ? <LoadingScreen /> : 
                status.success ? <SuccessScreen /> : 
                status.serverError ? <ErrorScreen /> : 
                <TokenNotFoundScreen />
                }
            </div>
        </div>
    )
}