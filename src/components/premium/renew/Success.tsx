import React from 'react'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import {Box, Typography} from '@material-ui/core'
import { BlueDenseButton } from '../../items/buttons';
import Link from 'next/link'

export default function Success() {

    return (
        <Box>
            <Box textAlign="center" mb={2}>
                <CheckCircleOutlineIcon style={{fontSize: 100}} color="secondary" />
            </Box>
            <Box mb={2} textAlign="center">
                <Typography variant="h6">
                    You now have 1 additional year of premium! 
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