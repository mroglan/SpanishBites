import React from 'react'
import styles from '../../../styles/Premium.module.css'
import {Box, Grid, Typography, Paper} from '@material-ui/core'

export default function PrimaryReasons() {

    return (
        <div>
            <Box mx={3}>
                <Box mb={3} textAlign="center">
                    <Typography variant="h3" className={styles.catamaran}>
                        Why not?
                    </Typography>
                </Box>
                <Box maxWidth={1000} mx="auto">
                    <Grid container spacing={3} justify="space-around">
                        <Grid item>
                            <Paper className={styles['reasons-item']} elevation={3}>
                                <Box p={3}>
                                    <Box mb={1} className={styles['reasons-img-container']}>
                                        <img className={styles['reasons-img']}
                                         src="/premium/landingPage/annotations.png" alt="Annotations image" />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h6">
                                            Passage Annotations
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={styles['reasons-item']} elevation={3}>
                                <Box p={3}>
                                    <Box mb={1} className={styles['reasons-img-container']}>
                                        <img className={styles['reasons-img']}
                                        src="/premium/landingPage/author-detailedinfo.png" alt="Authors Info image" />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h6">
                                            Detailed Author Info
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item>
                            <Paper className={styles['reasons-item']} elevation={3}>
                                <Box p={3}>
                                    <Box mb={1} className={styles['reasons-img-container']}>
                                        <img className={styles['reasons-img']}
                                        src="/premium/landingPage/passage-analysis.png" alt="Passages Analysis image" />
                                    </Box>
                                    <Box textAlign="center">
                                        <Typography variant="h6">
                                            Passage Analyses
                                        </Typography>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}