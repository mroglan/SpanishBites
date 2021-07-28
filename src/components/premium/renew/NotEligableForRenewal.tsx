import React from 'react'
import {Box, Typography} from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error';
import Link from 'next/link'
import {BlueDenseButton} from '../../items/buttons'

export default function NotEligable() {

    return (
        <Box>
            <Box textAlign="center" mb={2}>
                <ErrorIcon style={{fontSize: 100}} color="secondary" />
            </Box>
            <Box mb={2} textAlign="center">
                <Typography variant="h6">
                    You can only renew your premium subscription when you have less than one year remaining. 
                </Typography>
            </Box>
            <Box textAlign="center">
                <Link href="/dashboard">
                    <a>
                        <BlueDenseButton>
                            Go to Dashboard
                        </BlueDenseButton>
                    </a>
                </Link>
            </Box>
        </Box>
    )
}