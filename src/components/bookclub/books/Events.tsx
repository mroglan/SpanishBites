import { Box, Typography, Divider, Paper, Grid} from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react'
import { useSprings, animated } from 'react-spring';
import { ClientClubEvent } from '../../../database/dbInterfaces'
import styles from '../../../styles/BookClub.module.css'
import Link from 'next/link'
import axios from 'axios';
import { BluePrimaryButton } from '../../items/buttons';

interface Props {
    events: ClientClubEvent[];
}


export default function Events({events:dbEvents}:Props) {

    const months = {'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11}

    const [events, setEvents] = useState(dbEvents)
    const [moreToLoad, setMoreToLoad] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)

    const loadMore = async () => {
        setLoadingMore(true)

        const prevYear = years[years.length - 1].year - 1

        try {
            const {data:newEvents} = await axios({
                method: 'POST',
                url: '/api/bookclub/books/year',
                data: {year: prevYear}
            })

            if (newEvents.length < 12) setMoreToLoad(false)
            setEvents([...events, ...newEvents])
        } catch (e) { }

        setLoadingMore(false)
    }

    const years = useMemo(() => {
        return events.reduce((total, curr) => {
            const group = total.find(group => group.year == curr.year)
            if (group) {
                group.events.push(curr)
            } else {
                total.push({year: curr.year, events: [curr]})
            }
            return total
        }, []).sort((a, b) => b.year - a.year).map(group => ({...group, events: group.events.sort((a, b) => (
            months[b.month] - months[a.month]
        ))}))
    }, [events])

    const [springs, setSprings] = useSprings<any>(years.length * 12, i => ({scale: 1}))

    const animateLarger = (index:number) => {
        setSprings(i => {
            if(i === index) return {scale: 1.05}
            return {scale: 1}
        })
    }

    const animateSmaller = () => {
        setSprings(i => {
            return {scale: 1}
        })
    }

    return (
        <div>
            {years.map((year, i) => (
                <React.Fragment key={year.year}>
                    <Box my={3} textAlign="center">
                        <Box display="inline-block">
                            <Typography variant="h2" className={styles.catamaran}>
                                {year.year}
                            </Typography>
                            <Divider style={{backgroundColor: 'hsl(359, 94%, 32%)', height: 3}} />
                        </Box>
                    </Box>
                    {year.events.map((event, j) => (
                        <Box key={event._id} my={3}>
                            <Link href="/bookclub/books/[year]/[month]" as={`/bookclub/books/${event.year}/${event.month}`}>
                                <a>
                                    <animated.div onMouseEnter={() => animateLarger((i * 12) + (j % 12))} onMouseLeave={() => animateSmaller()}
                                        style={{transform: springs[(i * 12) + (j % 12)].scale.interpolate(s => `scale(${s})`)}}>
                                        <Paper elevation={3}>
                                            <Grid container spacing={3}>
                                                <Grid item style={{flex: 1}} className={styles['next-info-container']}>
                                                    <Box px={3} >
                                                        <Box textAlign="center" mb={3}>
                                                            <Typography variant="h3">
                                                                {event.month}
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
                        </Box>
                    ))}
                </React.Fragment>
            ))}
            {moreToLoad && <Box my={3}>
                <Box mx="auto" maxWidth={300} textAlign="center">
                    <BluePrimaryButton onClick={() => loadMore()} disabled={loadingMore} fullWidth>
                        Load More
                    </BluePrimaryButton>
                </Box>
            </Box>}
        </div>
    )
}