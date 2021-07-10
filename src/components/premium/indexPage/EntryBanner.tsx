import React from 'react'
import styles from '../../../styles/Premium.module.css'
import {Box, Grid, Typography} from '@material-ui/core'

export default function EntryBanner() {

    return (
        <div>
            <Box mt={3} py={3}>
                <Box className={styles['entry-content-container']}>
                    <Box mx="auto" maxWidth={1000} minHeight={200}>
                        <Grid container wrap="nowrap" alignItems="center">
                            <Grid item>
                                <Box height={200}>
                                    <Box className={styles['entry-img-carousel-item']}>
                                        <img height={250} src="/premium/authors/cervantes with shades.png" />
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item>
                                <Box py={3} ml={3}>
                                    <Typography className={`${styles.catamaran} ${styles['entry-title']}`}
                                     variant="h2" component="h1" color="secondary">
                                        Upgrade your Experience with Premium
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <div className={styles['entry-bookmark']} />
                </Box>
            </Box>
        </div>
    )
}