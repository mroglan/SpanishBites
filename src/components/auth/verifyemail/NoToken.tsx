import React from 'react'
import {Box, Paper, Typography} from '@material-ui/core'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from 'next/link'
import {PrimaryLink} from '../../items/links'

export default function NoToken() {

    return (
        <Box height="100%" display="flex" alignItems="center" justifyContent="center">
            <Box maxWidth={400}>
                <Paper elevation={3}>
                    <Box p={3}>
                        <Box mb={3} textAlign="center">
                            <MailOutlineIcon color="secondary" style={{fontSize: 100}} />
                        </Box>
                        <Box textAlign="center">
                            <Typography variant="h6">
                                Check your email for instructions to verify your account. If you don't see an email after a few minutes,{' '}
                                <Link href="/auth/resendemail">
                                    <a>
                                        <PrimaryLink variant="h6">
                                            resend it.
                                        </PrimaryLink>
                                    </a>
                                </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}