import React from 'react'
import {Event as dbEvent} from '../../../database/dbInterfaces'
import styles from '../../../styles/Timeline.module.css'
import {Box, Grid, Typography} from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import TextDisplay from '../../mui-rte/TextDisplay'

interface Event extends dbEvent {
    type: string;
    side: string;
}

interface Props {
    events: Event[];
}

export default function TimeLine({events}:Props) {

    return (
        <div className={styles.timeline}>
            {events.map((event, i) => (
                <div key={i} data-testid="eventItem" className={`${styles.container} ${styles[event.side]}`}>
                    <div className={styles.content}>
                       <div>
                            <Box>
                                <Typography data-testid="eventDate" variant="h4">
                                    {event.date}
                                </Typography>
                            </Box>
                            {event.location && <Box fontSize="1.1rem" pt={1}>
                                <Grid container alignItems="center">
                                    <LocationOnIcon color="secondary" fontSize="inherit" />
                                    <Grid item>
                                        <Typography data-testid="eventLocation"  variant="body1">
                                            <em>{event.location}</em>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>}
                            <Box>
                                <div data-testid="eventDescription">
                                    <TextDisplay text={event.desc} />
                                </div>
                            </Box>
                        </div>
                        <div className={styles['img-container']}>
                            <img data-testid="eventImage" src={event.image || '/no-profile.jpg'} title={event.title} />
                        </div> 
                    </div>
                </div>
            ))}
        </div>
    )
}