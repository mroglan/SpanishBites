import React from 'react'
import styles from '../../styles/Home.module.css'
import {ClientSpanishBite} from '../../database/dbInterfaces'
import {Typography} from '@material-ui/core'
import BiteCard from '../library/bites/BiteCard'
import LibraryGraphic from './LibraryGraphic'

interface Props {
    bite: ClientSpanishBite;
}

export default function Library({bite}:Props) {

    return (
        <div className={styles['library-root']}>
            <section>
                <div className={styles['c1-container']}>
                    <div className={styles['c1-graphic-container']}>
                        <BiteCard bite={bite} />
                    </div>
                    <div className={styles['c1-text-container']}>
                        <div>
                            <Typography variant="h3" gutterBottom className={`${styles['catamaran']} ${styles['title-text']}`}>
                                Daily Bites from across Spanish literature
                            </Typography>
                            <Typography variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                                Discover a new topic in Spanish literature, learn about different figurative language, or just enjoy a short
                                &ldquo;bite&rdquo; of literature.
                            </Typography>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={styles['c1-container']}>
                    <div className={styles['c1-text-container']}>
                        <div>
                            <Typography variant="h3" gutterBottom className={`${styles['catamaran']} ${styles['title-text']}`}>
                                An extensive library at your fingertips
                            </Typography>
                            <Typography variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                                Explore some of the best authors, books, and passages of Spanish literature. 
                            </Typography>
                        </div>
                    </div>
                    <div className={styles['c1-graphic-container']}>
                        <LibraryGraphic />
                    </div>
                </div>
            </section>
        </div>
    )
}