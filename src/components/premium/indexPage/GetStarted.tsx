import React from 'react'
import {Box, Typography} from '@material-ui/core'
import {BluePrimaryButton} from '../../items/buttons'

export default function GetStarted() {

    return (
        <div>
            <Box mx={3} mt={5} mb={3}>
                <Box mx="auto"  width="clamp(100px, 100%, 500px)">
                    <BluePrimaryButton fullWidth>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Get Started
                            </Typography>
                            <Typography variant="body1">
                                $29.99 for 1 year
                            </Typography>
                        </Box>
                    </BluePrimaryButton>
                </Box>
            </Box>
        </div>
    )
}