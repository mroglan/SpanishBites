import React from 'react'
import styles from '../../styles/About.module.css'
import {Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import {SecondaryLink} from '../items/links'

export default function Context() {

    return (
        <Box position="relative" py={6} px={6}>
            <div className={styles['c1-container']}>
                <div className={styles['c1-graphic-container']}>
                    <img src="/about/context.png" />
                </div>
                <div className={styles['c1-text-container']}>
                    <div>
                        <Typography variant="h3" gutterBottom className={`${styles['catamaran']} ${styles['title-text']}`}>
                            Knowing What's Going On
                        </Typography>
                        <Typography display="inline" variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                            Crucial to understanding any piece in literature is knowing its context- what events, movements, or ideas were shaping society when it was written. 
                            Without this, it’s hard to appreciate a literary work. With{' '}
                        </Typography>
                        <Link href="/library/timeperiods">
                            <a>
                                <SecondaryLink display="inline" className={`${styles['catamaran']} ${styles['body-text']}`}>
                                    timelines
                                </SecondaryLink>
                            </a>
                        </Link>
                        <Typography variant="body1" display="inline" className={`${styles['catamaran']} ${styles['body-text']}`}>
                            , descriptions, and analysis encompassing many works, 
                            Spanish Bites provides you with a foundation to start reading.
                        </Typography>
                    </div>
                </div>
            </div>
            <div className={`${styles['white-triangle']} ${styles['triangle']}`} />
        </Box>
    )
}