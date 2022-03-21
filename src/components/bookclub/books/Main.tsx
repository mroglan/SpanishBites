import { Box, Typography } from '@material-ui/core';
import React from 'react'
import { ClientClubEvent } from '../../../database/dbInterfaces'
import styles from '../../../styles/BookClub.module.css'
import {PrimaryLink} from '../../items/links'
import Events from './Events';

interface Props {
    events: ClientClubEvent[];
}

export default function Main({events}:Props) {

    return (
        <div className={styles['books-list-container']}>
            <div className={styles['books-list-side']} />
            <Box flexBasis={800} maxWidth={800} px={3} mt={3}>
                <Box textAlign="center">
                    <Typography gutterBottom variant="h2" className={styles.catamaran}>
                        Books we've read!
                    </Typography>
                </Box>
                <Box textAlign="center">
                    <Typography style={{display: 'inline'}} variant="body1" className={`${styles['desc-text']} ${styles.catamaran}`}>
                        Check out our{' '}
                    </Typography>
                    <a style={{cursor: 'pointer'}} target="_blank" href="https://www.facebook.com/groups/1625047621168693">
                        <PrimaryLink variant="h6" className={`${styles['desc-text']} ${styles.catamaran}`}>
                            Facebook Group
                        </PrimaryLink>
                    </a>
                    <Typography style={{display: 'inline'}} variant="body1" className={`${styles['desc-text']} ${styles.catamaran}`}>
                        {' '}to get involved with the discussion and selection of books. Whether you're 
                        fluent in Spanish or looking to improve your understanding, we'd love to see you join!
                    </Typography>
                </Box>
                <Events events={events} />
            </Box>
            <div className={styles['books-list-side']} />
        </div>
    )
}