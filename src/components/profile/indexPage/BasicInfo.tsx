import React, {useState} from 'react'
import styles from '../../../styles/Profile.module.css'
import { ClientCookieUser } from '../../../database/dbInterfaces'
import {Box, Paper, Typography} from '@material-ui/core'
import { Bite } from '../../items/bites'
import BasicInfoForm from '../../forms/BasicInfo'
import {FormikHelpers} from 'formik'
import axios from 'axios'
import SnackbarMessage from '../../items/SnackbarMessage'

interface Props {
    user: ClientCookieUser;
}

interface FormVals {
    name: string;
    username: string;
    email: string;
}

export default function BasicInfo({user}:Props) {

    const [message, setMessage] = useState({type: '', content: ''})

    const initialVals = {
        name: user.name,
        username: user.username,
        email: user.email
    }

    const updateProfile = async (vals:FormVals, actions:FormikHelpers<FormVals>) => {
        try {
            await axios({
                method: 'POST',
                url: '/api/auth/profile/update',
                data: {values: vals}
            })

            setMessage({type: 'success', content: 'Updates saved!'})
        } catch(e) {
            if(e.response.status === 409) {
                actions.setFieldError(e.response.data.field, e.response.data.msg)
            }
            actions.setSubmitting(false)
        }
    }

    return (
        <div>
            <Box maxWidth={700}>
                <Bite>
                    <Paper elevation={3}>
                        <Box p={3}>
                            <Box mr={9}>
                                <Typography variant="h3" className={styles.catamaran} gutterBottom>
                                    Basic Info
                                </Typography>
                            </Box>
                            <Box my={3}>
                                <Box maxWidth={400}>
                                    <BasicInfoForm vals={initialVals} onSubmit={updateProfile} />
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                </Bite>
            </Box>
            <SnackbarMessage message={message} setMessage={setMessage} />
        </div>
    )
}