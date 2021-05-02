import React, {useState} from 'react'
import {Box, Paper, Typography} from '@material-ui/core'
import {Bite} from '../items/bites'
import styles from '../../styles/Forms.module.css'
import authStyles from '../../styles/Auth.module.css'
import {ContactMessage} from '../../database/dbInterfaces'
import {FormikHelpers} from 'formik'
import ContactUs from '../forms/ContactUs'
import axios from 'axios'
import SnackbarMessage from '../items/SnackbarMessage'

export function SuccessScreen() {

    return (
        <div className={authStyles['main-root']}>
            <div>
                <div className={authStyles['main-img-container']}>
                    <img src="/contact-us/book stack.png" />
                </div>
                <div className={authStyles['main-message-container']}>
                    <Box textAlign="center" mb={1}>
                        <Typography className={authStyles['catamaran']} variant="h3">
                            Message Sent
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" component="span" className={authStyles['catamaran']}>
                            Check your inbox for our reply!
                        </Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}

export default function Main() {

    const [message, setMessage] = useState({type: '', content: ''})
    const [success, setSuccess] = useState(false)
    
    const initialVals = {
        name: '',
        type: 'question',
        message: '',
        email: ''
    }

    const onSubmit = async (values:ContactMessage, actions:FormikHelpers<ContactMessage>) => {
        try {
            await axios({
                method: 'POST',
                url: '/api/contact-us/new-message',
                data: {values}
            })
            
            setSuccess(true)
        } catch(e) {
            setMessage({type: 'error', content: 'Error Sending Message'})
            actions.setSubmitting(false)
        }
    }

    return (
        <div>
            {success ? <SuccessScreen /> : <>
                <Box mt={5} mx="auto" maxWidth={600}>
                    <Bite>
                        <Paper elevation={3}>
                            <Box p={3}>
                                <Box mr={9}>
                                    <Typography className={styles['catamaran']} variant="h3" gutterBottom>
                                        Contact us
                                    </Typography>
                                </Box>
                                <Box my={3}>
                                    <ContactUs vals={initialVals} onSubmit={onSubmit} />
                                </Box>
                            </Box>
                        </Paper>
                    </Bite>
                </Box>
                <SnackbarMessage message={message} setMessage={setMessage} />
            </>}
        </div>
    )
}