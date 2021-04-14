import React from 'react'
import styles from '../../styles/About.module.css'
import {Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import {SecondaryLink} from '../items/links'

export default function FindingBooks() {

    return (
        <Box position="relative" bgcolor="#fff" py={6} px={6}>
            <div className={styles['c1-container']}>
                <div className={styles['c1-text-container']}>
                    <div>
                        <Typography variant="h3" gutterBottom className={`${styles['catamaran']} ${styles['title-text']}`}>
                            Finding What You Like
                        </Typography>
                        <Typography display="inline" variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                        There is a lot of Spanish literature, and finding an author, book, or movement in literature that interests you is important.
                        Spanish Bites allows you do this by giving you a{' '}
                        </Typography>
                        <Link href="/library?libraryItem=passages">
                            <a>
                                <SecondaryLink display="inline" className={`${styles['catamaran']} ${styles['body-text']}`}>
                                    collection of passages
                                </SecondaryLink>
                            </a>
                        </Link>
                        <Typography variant="body1" display="inline" className={`${styles['catamaran']} ${styles['body-text']}`}>
                            {' '}from across history. 
                            They only take a couple minutes to read and can help you choose what to read next! 
                        </Typography>
                    </div>
                </div>
                <div className={styles['c1-graphic-container']}>
                    <img src="/about/grabbingBook.png" />
                </div>
            </div>
            <div className={`${styles['gray-triangle']} ${styles['triangle']}`} />
        </Box>
    )
}
