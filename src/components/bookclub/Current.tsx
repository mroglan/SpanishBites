import React from 'react'
import {ClientClubEvent} from '../../database/dbInterfaces'
import {Box, Typography, Grid, colors, Divider, Paper} from '@material-ui/core'
import styles from '../../styles/BookClub.module.css'
import {BookDescTextDisplay} from '../mui-rte/TextDisplay'
import {PrimaryLink} from '../items/links'
import Next from './Next'
import Previous from './Previous'

interface Props {
    events: {current: ClientClubEvent; prev: ClientClubEvent[]; next: ClientClubEvent;};
}

export default function Current({events}:Props) {

    const event = events.current

    if (!event || !event._id) {
        return <div>Looks like we're not reading anything this month?</div>
    }

    return (
        <div>
            <Box p={3}>
                <Grid container spacing={3}>
                    <Grid item className={styles['book-img-grid-item']} >
                        <img src={event.bookImage} className={styles['book-img']} />
                        <div />
                    </Grid> 
                    <Grid item style={{flex: 1}}>
                        <Paper elevation={3} className={styles['current-info-box']}>
                            <Box mb={3}>
                                <Typography variant="h3">
                                    {event.month} {event.year}
                                </Typography>
                                <Divider style={{backgroundColor: 'hsl(359, 94%, 32%)'}} />
                            </Box>
                            <Box mb={1}>
                                <Typography variant="h5" >
                                    <i>{event.bookName}</i> by {event.bookAuthor}
                                </Typography>
                            </Box>
                            <Box maxWidth={700} mb={3}>
                                <BookDescTextDisplay text={event.bookDesc} />
                            </Box>
                            <Box>
                                <Typography variant="h6" style={{display: 'inline'}}>
                                    Join the Conversation on our{' '}
                                </Typography>
                                <a style={{cursor: 'pointer'}} target="_blank" href="https://www.facebook.com/groups/1625047621168693">
                                    <PrimaryLink variant="h6">
                                        Facebook Group!
                                    </PrimaryLink>
                                </a>
                            </Box>
                        </Paper>
                        <Next event={events.next} />
                        <Previous events={events.prev} />
                    </Grid>
                </Grid> 
            </Box>
        </div>
    )
}