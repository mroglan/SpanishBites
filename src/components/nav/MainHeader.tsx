import React from 'react'
import {Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'

interface Props {
    bg: string;
}

export default function Header({bg}:Props) {

    return (
        <Box>
            <Box className={styles['main-root']} textAlign="center" style={{background: bg}}>
                <Grid container alignItems="center" justify="space-between">
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
                    <Grid item>
                        <Grid container wrap="nowrap" spacing={1} alignItems="center">
                            <Grid item>
                                <Link href="/library">
                                    <a>
                                        <Typography className={styles.link} variant="h6">
                                            Library
                                        </Typography>
                                    </a>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}