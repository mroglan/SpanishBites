import React from 'react'
import styles from '../../../../styles/Resource.module.css'
import {Paper, Box, Typography} from '@material-ui/core'

export default function PremiumDisplay() {

    return (
        <div className={styles['no-premium-message-root']}>
            <Paper elevation={3}>
                <Box p={3} textAlign="center">
                    <Typography variant="body1">
                        Analysis, audio, and annotations coming soon with Spanish Bites Premium!
                    </Typography>
                </Box>
            </Paper>
        </div>
    )
}