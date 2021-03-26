import React from 'react'
import styles from '../../styles/About.module.css'
import {Box, Typography} from '@material-ui/core'

export default function Title() {

    return (
        <div className={styles['title-root']}>
            <div>
                <div className={styles['title-content']}>
                    <Box textAlign="center" py={3}>
                        <Typography variant="h3" className={styles['catamaran']}>
                            Step into Spanish Literature
                        </Typography>
                    </Box>
                </div>
            </div>
        </div>
    )
}