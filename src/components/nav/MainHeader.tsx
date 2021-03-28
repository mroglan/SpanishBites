import React from 'react'
import {ClientCookieUser} from '../../database/dbInterfaces'
import {Box, Typography, Grid, Avatar, Divider, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import UserNavDropdown from './UserNavDropdown'
import {BlueDenseButton} from '../items/buttons'

interface Props {
    bg: string;
    user?: ClientCookieUser;
}

function HeaderContent({user, bg}) {

    return (
        <Box py={2} className={styles['main-root']} textAlign="center" style={{background: bg}}>
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
                    <Grid container wrap="nowrap" spacing={3} alignItems="center">
                        <Grid item>
                            <Link href="/about">
                                <a>
                                    <Typography className={styles.link} variant="h6">
                                        About
                                    </Typography>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/bookclub">
                                <a>
                                    <Typography className={styles.link} variant="h6">
                                        Book Club
                                    </Typography>
                                </a>
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/library">
                                <a>
                                    <Typography className={styles.link} variant="h6">
                                        Library
                                    </Typography>
                                </a>
                            </Link>
                        </Grid>
                        {user ? <Grid item>
                            <UserNavDropdown user={user} />
                        </Grid> : <Grid style={{marginLeft: '1rem'}} item>
                            <Link href="/login">
                                <a>
                                    <BlueDenseButton>
                                        <Typography variant="body1">
                                            Sign in
                                        </Typography>
                                    </BlueDenseButton>
                                </a>
                            </Link>
                        </Grid>}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default function Header({bg, user}:Props) {

    if(bg === 'none') {
        return (
            <Paper style={{background: bg}} square elevation={3}>
                <HeaderContent bg={bg} user={user} />
            </Paper>
        )
    }

    return (
        <Box>
            <HeaderContent bg={bg} user={user} />
        </Box>
    )
}