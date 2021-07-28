import React, {useState, useMemo} from 'react'
import {Box, Typography, Grid, Button} from '@material-ui/core'
import { ClientCookieUser } from '../../database/dbInterfaces'
import dayjs from 'dayjs'
import Link from 'next/link'
import {BlueDenseButton} from '../items/buttons'

interface Props {
    user: ClientCookieUser;
}

export default function Premium({user}:Props) {

    const info = useMemo(() => {
        if(!user.premiumExpiration || dayjs().diff(dayjs(user.premiumExpiration)) > 0) {
            return {msg: 'You do not currently have premium', btn: {msg: 'Upgrade', url: '/premium'}}
        }
        if(dayjs().add(1, 'year').diff(dayjs(user.premiumExpiration)) > 0) {
            return {msg: `Your premium version is set to expire ${dayjs(user.premiumExpiration).format('MMMM D, YYYY')}`, btn: {
                msg: 'Renew', url: '/premium/renew'
            }}
        }
        return {msg: `Your premium version is set to expire ${dayjs(user.premiumExpiration).format('MMMM D, YYYY')}`, btn: null}
    }, [user])

    return (
        <div>
            <Box maxWidth={500} mx="auto">
                <Box borderRadius={50} p={3} bgcolor="hsl(140, 81%, 31%)">
                    <Grid container spacing={3} alignItems="center" justify="center">
                        <Grid item>
                            <Box maxWidth={300} textAlign="center">
                                <Typography variant="body1" style={{color: '#fff'}}>
                                    {info.msg}
                                </Typography>
                            </Box>
                        </Grid> 
                        {info.btn && <Grid item>
                            <Link href={info.btn.url}>
                                <a>
                                    <BlueDenseButton>
                                        <Typography variant="body1" style={{color: '#fff'}}>
                                            {info.btn.msg}
                                        </Typography>
                                    </BlueDenseButton>
                                </a>
                            </Link>
                        </Grid>}
                    </Grid>     
                </Box> 
            </Box>
        </div>
    )
}