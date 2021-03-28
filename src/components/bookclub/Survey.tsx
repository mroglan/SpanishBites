import React from 'react'
import {ClientCookieUser} from '../../database/dbInterfaces'
import {Box, Grid, Typography} from '@material-ui/core'
import {BlueDenseButton} from '../items/buttons'
import Link from 'next/link'

interface Props {
    user: ClientCookieUser;
}

export function NotSignedIn() {
    return (
        <Box>
            <Box p={6} border="1px solid #000" maxWidth={500} mx="auto">
                <Grid container justify="center" alignItems="center" spacing={3}>
                    <Grid xs={12} item>
                        <Box textAlign="center">
                            <Typography variant="body1">
                                Please sign in to access the survey.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Link href="/login">
                            <a>
                                <BlueDenseButton>
                                    <Typography variant="body1">
                                        Sign in
                                    </Typography>
                                </BlueDenseButton>
                            </a>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default function Survey({user}:Props) {

    if(!user) {
        return <NotSignedIn />
    }

    return (
        <div>
            hello world
        </div>
    )
}