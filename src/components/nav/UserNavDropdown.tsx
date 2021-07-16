import React, {useState} from 'react'
import {MenuItem, MenuList, ClickAwayListener, Paper, Popper, Avatar, Typography, Box, Divider, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {ClientCookieUser} from '../../database/dbInterfaces'
import Link from 'next/link'
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {logout} from '../../utils/auth'

interface Props {
    user: ClientCookieUser;
}

const useStyles = makeStyles(theme => ({
    root: {
        cursor: 'pointer',
    },
    menuItem: {
        padding: '.4rem 1.5rem'
    },
    link: {
        textDecoration: 'none'
    },
    catamaran: {
        fontFamily: 'catamaran !important'
    },
    avatar: {
        '&:hover': {
            border: `1.5px solid ${theme.palette.primary.dark}`
        }
    }
}))

export default function UserNavDropdown({user}:Props) {

    const [anchorEl, setAnchorEl] = useState(null)

    const handleAvatarClick = (e) => {
        setAnchorEl(anchorEl ? null : e.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Avatar alt={user.name} className={classes.avatar} src={user.image?.src || '/no-profile.jpg'} onClick={(e) => handleAvatarClick(e)} />
            <Popper style={{zIndex: 2500}} open={Boolean(anchorEl)} anchorEl={anchorEl} role="nav" transition placement="bottom-end">
                <Paper elevation={3} >
                    <ClickAwayListener onClickAway={handleClose}>
                        <div>
                            <Link href="/dashboard">
                                <a className={classes.link}>
                                    <MenuItem className={classes.menuItem}>
                                        <Grid container alignItems="center" spacing={1} wrap="nowrap">
                                            <Grid xs={3} container alignItems="center" item>
                                                <DashboardIcon color="primary" />
                                            </Grid>
                                            <Grid xs={9} item>
                                                <Typography className={classes.catamaran} variant="h6">
                                                    Dashboard
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                </a>    
                            </Link>
                            <Link href="/profile">
                                <a className={classes.link}>
                                    <MenuItem className={classes.menuItem}>
                                        <Grid container spacing={1} alignItems="center" wrap="nowrap">
                                            <Grid xs={3} item container alignItems="center">
                                                <AccountCircleIcon color="primary" />
                                            </Grid>
                                            <Grid xs={9} item>
                                                <Typography className={classes.catamaran} variant="h6">
                                                    My Profile
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </MenuItem>
                                </a>
                            </Link>
                            <Divider />
                            <MenuItem onClick={() => logout()} className={classes.menuItem}>
                                <Grid container spacing={1} alignItems="center" wrap="nowrap">
                                    <Grid xs={3} item container alignItems="center">
                                        <ExitToAppIcon color="secondary" />
                                    </Grid>
                                    <Grid xs={9} item>
                                        <Typography className={classes.catamaran} variant="h6">
                                            Logout
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        </div>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    )
}
