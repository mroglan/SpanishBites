import React from 'react'
import {Box, Divider, Grid, Typography} from '@material-ui/core'
import Link from 'next/link'
import styles from '../../styles/Footer.module.css'
import {SecondaryLink} from '../items/links'
import InstagramIcon from '@material-ui/icons/Instagram';
import FacebookIcon from '@material-ui/icons/Facebook';
import YoutubeIcon from '@material-ui/icons/YouTube';
import {RedPrimaryButton, RedPrimaryIconButton} from '../items/buttons'

export default function MainFooter() {

    return (
        <div>
            <Divider />
            <Box mt={1} mx={4}>
                <Grid className={styles['grid-container']} container spacing={8}>
                    <Grid item>
                        <Box mb={1}>
                            <Link href="/">
                                <a className={styles.link}>
                                    <Grid container wrap="nowrap" spacing={1} alignItems="center">
                                        <Grid item>
                                            <img src="/logo3.svg" title="Spanish Bites" style={{width: 30, height: 30}} />
                                        </Grid>
                                        <Grid item>
                                            <Typography className={styles.title} variant="h5" component="h1">
                                                Spanish Bites
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </a>
                            </Link>
                        </Box>
                        <Box mb={0} pl="42px">
                            <Link href="/contact-us">
                                <a className={styles.link}>
                                    <SecondaryLink style={{fontSize: 18}} variant="button">
                                        Contact us
                                    </SecondaryLink>
                                </a>
                            </Link>
                        </Box>
                        <Box mb={1}>
                            <Grid container spacing={0} justify="center">
                                <Grid item>
                                    <Link href="https://www.youtube.com/channel/UCxKR2DLAYeCYlMEsNOG8yBg">
                                        <a target="_blank">
                                            <RedPrimaryIconButton>
                                                <YoutubeIcon style={{fontSize: 35}} />
                                            </RedPrimaryIconButton>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.facebook.com/profile.php?id=100074269879439">
                                        <a target="_blank">
                                            <RedPrimaryIconButton>
                                                <FacebookIcon style={{fontSize: 35}} />
                                            </RedPrimaryIconButton>
                                        </a>
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="https://www.instagram.com/spanishbit.es/">
                                        <a target="_blank">
                                            <RedPrimaryIconButton>
                                                <InstagramIcon style={{fontSize: 35}} />
                                            </RedPrimaryIconButton>
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mt="5px" mb={1}>
                            <Typography variant="h5">
                                External Resources
                            </Typography>
                        </Box>
                        <Box>
                            <Box>
                                <a href="https://www.casadellibro.com/">
                                    <SecondaryLink gutterBottom variant="body1">
                                        Casa del Libro
                                    </SecondaryLink>
                                </a>
                            </Box>
                            <Box>
                                <a href="http://www.cervantesvirtual.com/">
                                    <SecondaryLink gutterBottom variant="body1">
                                        Biblioteca Virtual Miguel de Cervantes
                                    </SecondaryLink>
                                </a>
                            </Box>
                            <Box>
                                <a href="https://www.circulo.es/">
                                    <SecondaryLink gutterBottom variant="body1">
                                        Círculo de Lectores
                                    </SecondaryLink>
                                </a>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Box mt="5px" mb={1}>
                            <Typography variant="h5">
                                Maria
                            </Typography>
                        </Box>
                        <Box>
                            <Box>
                                <Link href="/maria/about">
                                    <a>
                                        <SecondaryLink variant="body1">
                                            About Me
                                        </SecondaryLink>
                                    </a>
                                </Link>
                            </Box>
                            <Box>
                                <a href="mailto:maria@spanishbit.es">
                                    <SecondaryLink variant="body1">
                                        maria@spanishbit.es
                                    </SecondaryLink>
                                </a>
                            </Box>
                            <Box>
                                <Link href="/maria/blog">
                                    <a>
                                        <SecondaryLink variant="body1">
                                            Blog
                                        </SecondaryLink>
                                    </a>
                                </Link>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}