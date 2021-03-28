import React from 'react'
import {Box, Typography} from '@material-ui/core'
import styles from '../../styles/BookClub.module.css'

export default function Description() {

    return (
        <Box my={3} maxWidth={900} textAlign="center" mx="auto" px={3}>
            <Typography variant="body1" className={`${styles.catamaran} ${styles['desc-text']}`}>
                We are excited to start the book club soon. If you are interested in joining the book club, you will need to create
                an account to sign up for a club meeting. We are considering many different books and meeting times for our first month,
                so feel free to complete (only once) the form below to give us your input!
            </Typography>
        </Box>
    )
}