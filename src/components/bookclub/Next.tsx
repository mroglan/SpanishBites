import { Grid, Paper, Box, Typography, Divider } from '@material-ui/core';
import React from 'react'
import { ClientClubEvent } from '../../database/dbInterfaces'
import styles from '../../styles/BookClub.module.css'

interface Props {
    event: ClientClubEvent;
}

export default function Next({event}:Props) {

    if (!event) {
        return <div />
    }

    return (
        <div>
            <Paper elevation={3}>
                <Grid container spacing={3}>
                    <Grid item style={{flex: 1}} className={styles['next-info-container']}>
                        <Box pl={3} >
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
        </div>
    )
}