import React from 'react'
import {Box, Typography} from '@material-ui/core'
import {ClientCookieUser} from '../../database/dbInterfaces'
import RecentlyViewed from './RecentlyViewed'
import Premium from './Premium'

interface Props {
    user: ClientCookieUser;
}

export default function Dashboard({user}:Props) {

    return (
        <div>
            <Box textAlign="center" my={3} px={3}>
                <Typography variant="h3">
                    Welcome, {user.name}
                </Typography>
            </Box>
            <Box mb={3}>
                <Premium user={user} />
            </Box>
            <Box mt={4} maxWidth={1000} mx="auto">
                <RecentlyViewed user={user} />
            </Box>
        </div>
    )
}