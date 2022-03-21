import React from 'react'
import { ClientClubEvent } from '../../../../database/dbInterfaces'
import styles from '../../../../styles/BookClub.module.css'
import {BookDescTextDisplay} from '../../../mui-rte/TextDisplay'
import {PrimaryLink} from '../../../items/links'
import {Box, Grid, Typography, Paper, Divider} from '@material-ui/core'

interface Props {
    event: ClientClubEvent;
}

export default function Main({event}:Props) {

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
                    </Grid>
                </Grid> 
            </Box>
        </div>
    )
}