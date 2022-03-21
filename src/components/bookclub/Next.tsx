import { Grid, Paper, Box, Typography, Divider } from '@material-ui/core';
import React from 'react'
import { ClientClubEvent } from '../../database/dbInterfaces'
import styles from '../../styles/BookClub.module.css'
import Link from 'next/link'
import {animated, useSprings} from 'react-spring'

interface Props {
    event: ClientClubEvent;
}

export default function Next({event}:Props) {

    if (!event || !event._id) {
        return <div />
    }

    const [springs, setSprings]= useSprings<any>(1, i => ({scale: 1}))

    const animateLarger = () => {
        setSprings(() => ({scale: 1.05}))
    }

    const animateSmaller = () => {
        setSprings(() => ({scale: 1}))
    }

    return (
        <div className={styles['next-info-box']}>
            <Link href="/bookclub/books/[year]/[month]" as={`/bookclub/books/${event.year}/${event.month}`}>
                <a>
                    <animated.div onMouseEnter={() => animateLarger()} onMouseLeave={() => animateSmaller()}
                        style={{transform: springs[0].scale.interpolate(s => `scale(${s})`)}}>
                        <Paper style={{border: '5px solid hsla(229, 100%, 58%, .75)'}} elevation={3}>
                            <Grid container spacing={3}>
                                <Grid item style={{flex: 1}} className={styles['next-info-container']}>
                                    <Box px={3} >
                                        <Box textAlign="center" mb={3}>
                                            <Typography variant="h3">
                                                Next Month
                                            </Typography>
                                            <Divider style={{backgroundColor: 'hsl(359, 94%, 32%)'}} />
                                        </Box>
                                    </Box>
                                    <Box pl={3} className={styles['next-info']}>
                                        <Box textAlign="center">
                                            <Typography gutterBottom variant="h4" >
                                                {event.bookName}
                                            </Typography>
                                            <Typography variant="h5">
                                                by {event.bookAuthor}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item className={styles['next-img-grid-item']}>
                                    <img src={event.bookImage} className={styles['next-img']} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </animated.div>
                </a>
            </Link>
        </div>
    )
}