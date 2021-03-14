import React from 'react'
import styles from '../../styles/Home.module.css'
import {Box, Typography, Grid, useMediaQuery} from '@material-ui/core'
import {RedPrimaryButton, RedSecondaryButton, BluePrimaryButton, BlueSecondaryButton} from '../items/buttons'
import Link from 'next/link'

const bannerImage = (mobile:boolean, small:boolean) => {
    if(mobile) return '/landingPage/donQuijote4.png'
    if(small) return '/landingPage/donQuijote3.png'
    return '/landingPage/donQuijote2.png'
}

export default function Banner() {

    const smallScreen = useMediaQuery('(max-width:1200px)')
    const mobileScreen = useMediaQuery('(max-width: 750px)');

    return (
        <div className={styles['donQuijote-banner-root']}>
            <div>
                <div className={styles['main-message-container']}>
                    <Box my={4}>
                        <Box className={styles['main-message-textbox']}>
                            <Typography variant="h2" component="h1" className={`${styles.catamaran} ${styles['red']} ${styles['main-message-title']}`} gutterBottom>
                                Bite Size Spanish Literature
                            </Typography>
                        </Box>
                        <Box className={styles['main-message-textbox']} px={6}>
                            <Typography variant="h6" className={`${styles['light-red']}`}>
                                Immerse yourself in Spanish Literature by browsing a collection of authors, books, passages, and more.
                            </Typography>
                        </Box>
                        <Box mt={3}>
                            <Grid container spacing={3} justify="center">
                                <Grid item>
                                    <Link href="/signup">
                                        <a className={styles.link}>
                                            <BluePrimaryButton variant="contained">
                                                <Typography variant="body1" color="inherit">
                                                    Create an Account
                                                </Typography>
                                            </BluePrimaryButton>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <BlueSecondaryButton variant="outlined">
                                        <Typography variant="body1" >
                                            Learn More
                                        </Typography>
                                    </BlueSecondaryButton>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </div>
                <div className={styles['donQuijote-image']}>
                    <img src={bannerImage(mobileScreen, smallScreen)} title="Don Quijote" />
                </div>
            </div>
        </div>
    )
}