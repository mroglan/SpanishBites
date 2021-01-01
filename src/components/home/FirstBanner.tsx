import styles from '../../styles/Home.module.css'
import {Box, Typography, Grid} from '@material-ui/core'
import {RedPrimaryButton, RedSecondaryButton} from '../items/buttons'

export default function Banner() {

    return (
        <div className={styles['donQuijote-banner-root']}>
            <div className={styles['main-message-container']}>
                <Box>
                    <Box textAlign="center">
                        <Typography variant="h2" component="h1" className={`${styles.catamaran} ${styles['red']}`} gutterBottom>
                            Bite Size Spanish Literature
                        </Typography>
                    </Box>
                    <Box textAlign="center" px={6}>
                        <Typography variant="h6" className={`${styles['light-red']}`}>
                            Immerse yourself in Spanish Literature by browsing a collection of authors, books, passages, and more.
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Grid container spacing={3} justify="center">
                            <Grid item>
                                <RedPrimaryButton variant="contained">
                                    <Typography variant="body1" color="inherit">
                                        Create an Account
                                    </Typography>
                                </RedPrimaryButton>
                            </Grid>
                            <Grid item>
                                <RedSecondaryButton variant="outlined">
                                    <Typography variant="body1" >
                                        Learn More
                                    </Typography>
                                </RedSecondaryButton>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </div>
            <div className={styles['donQuijote-image']}>
                <img src="/landingPage/donQuijote2.png" title="Don Quijote" />
            </div>
        </div>
    )
}