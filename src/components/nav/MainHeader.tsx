import React, {useState} from 'react'
import {ClientCookieUser} from '../../database/dbInterfaces'
import {Box, Typography, Grid, Divider, Paper, Drawer, List, ListItem} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import Link from 'next/link'
import styles from '../../styles/Header.module.css'
import UserNavDropdown from './UserNavDropdown'
import {BlueDenseButton, BluePrimaryIconButton} from '../items/buttons'
import MenuIcon from '@material-ui/icons/Menu';
import Router from 'next/router'
import {logout} from '../../utils/auth'

interface Props {
    bg: string;
    user?: ClientCookieUser;
}

const navItems = [
    {name: 'About', link: '/about'},
    {name: 'Book Club', link: '/bookclub'},
    {name: 'Library', link: '/library'},
    {name: 'Premium', link: '/premium'}
]

function HeaderContent({user, bg}) {

    const [openDrawer, setOpenDrawer] = useState(false)

    const redirectTo = (pathname:string) => {
        Router.push({
            pathname
        })
    }

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
                <Grid className={styles['large-screen-content']} item>
                    <Grid container wrap="nowrap" spacing={3} alignItems="center">
                        {navItems.map(item => (
                            <Grid key={item.name} item>
                                <Link href={item.link}>
                                    <a>
                                        <Typography variant="h6" className={styles.link}>
                                            {item.name}
                                        </Typography>
                                    </a>
                                </Link>
                            </Grid>
                        ))}
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
                <Grid className={styles['small-screen-content']} item>
                    <BluePrimaryIconButton onClick={() => setOpenDrawer(true)} >
                        <MenuIcon />
                    </BluePrimaryIconButton>
                </Grid>
            </Grid>
            <Drawer style={{zIndex: 2001}} classes={{paper: styles.drawer}} anchor="right" 
            open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List className={styles['drawer-list']}>
                    {navItems.map(item => (
                        <ListItem key={item.name} button onClick={() => redirectTo(item.link)}>
                            <Typography className={styles.link} variant="h6">
                                {item.name}
                            </Typography>
                        </ListItem>
                    ))}
                    <Divider style={{margin: '.5rem 0'}} />
                        {user ? <>
                            <ListItem button onClick={() => redirectTo('/dashboard')}>
                                <Typography color="primary" variant="h6">
                                    Dashboard
                                </Typography>
                            </ListItem>
                            <ListItem button onClick={() => redirectTo('/profile')}>
                                <Typography color="primary" variant="h6">
                                    My Profile
                                </Typography>
                            </ListItem>
                            <Divider style={{margin: '.5rem 0'}} />
                            <ListItem button onClick={() => logout()}>
                                <Typography className={styles.link} variant="h6">
                                    Logout
                                </Typography>
                            </ListItem>
                        </> : <ListItem>
                            <BlueDenseButton onClick={() => redirectTo('/login')}>
                                <Typography variant="body1">
                                    Sign in
                                </Typography>
                            </BlueDenseButton>
                        </ListItem>}
                </List>
            </Drawer>
        </Box>
    )
}

export default function Header({bg, user}:Props) {

    if(bg === 'none') {
        const background = 'hsl(50, 100%, 97%)'
        return (
            <Paper style={{background}} square elevation={3}>
                <HeaderContent bg={background} user={user} />
            </Paper>
        )
    }

    return (
        <Box>
            <HeaderContent bg={bg} user={user} />
        </Box>
    )
}