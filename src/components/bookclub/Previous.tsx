import React, { useMemo } from 'react'
import { ClientClubEvent } from '../../database/dbInterfaces'
import {useSprings, animated} from 'react-spring'
import Link from 'next/link'
import {Box, Grid, Paper, Typography} from '@material-ui/core'
import styles from '../../styles/BookClub.module.css'

interface Props {
    events: ClientClubEvent[];
}

export default function Previous({events}:Props) {

    if (events.length === 0) {
        return <div />
    }

    const minLenEvents = useMemo(() => {
        return Array(5).fill(null).map((_, i) => events[i] || events[0])
    }, [events])

    const [springs, setSprings]= useSprings<any>(1, i => ({scale: 1}))

    const animateLarger = () => {
        setSprings(() => ({scale: 1.05}))
    }

    const animateSmaller = () => {
        setSprings(() => ({scale: 1}))
    }

    return (
        <div>
            <Link href="/bookclub/books">
                <a>
                    <animated.div onMouseEnter={() => animateLarger()} onMouseLeave={() => animateSmaller()}
                    style={{transform: springs[0].scale.interpolate(s => `scale(${s})`)}}>
                        <Paper style={{border: '5px solid hsla(229, 100%, 58%, .75)'}} elevation={3}>
                            <Grid container spacing={3}>
                                <Grid item style={{flex: 1}}>
                                    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
                                        <Box textAlign="center">
                                            <Typography variant="h3">
                                                Previous Books
                                            </Typography>
                                        </Box>
                                    </Box> 
                                </Grid>
                                <Grid item className={styles['prev-img-container']}>
                                    {minLenEvents.map((event, i) => (
                                        <img key={i} src={event.bookImage} />
                                    ))}
                                </Grid>
                            </Grid>
                        </Paper>     
                    </animated.div>
                </a>
            </Link>
        </div>
    )
}