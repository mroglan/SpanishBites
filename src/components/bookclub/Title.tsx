import React from 'react'
import {Box, Typography} from '@material-ui/core'

export default function Title() {

    return (
        <Box my={3} textAlign="center">
            <Typography variant="h2" component="h1">
                Book Club
            </Typography>
        </Box>
    )
}