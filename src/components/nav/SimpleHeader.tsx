import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import {Box, Typography, Grid} from '@material-ui/core'

interface Props {
    bg: string;
}

export default function SimpleHeader({bg}:Props) {

    return (
        <Box>
            <Box className={styles['main-root']} style={{background: bg}}>
                <Grid container justify="center">
                    <Grid item>
                        <Link href="/">
                            <a className={styles.link}>
                                <Grid container wrap="nowrap" spacing={1} alignItems="center">
                                    <Grid item>
                                        <img src="/logo3.svg" title="Spanish Bites" style={{width: 40, height: 40}} />
                                    </Grid>
                                    <Grid item>
                                        <Typography className={styles.title} variant="h4" component="h1">
                                            Spanish Bites
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </a>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}