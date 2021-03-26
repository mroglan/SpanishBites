import React from 'react'
import styles from '../../styles/About.module.css'
import {Box, Typography} from '@material-ui/core'

export default function FindingBooks() {

    return (
        <Box position="relative" bgcolor="#fff" py={6} px={6}>
            <div className={styles['c1-container']}>
                <div className={styles['c1-text-container']}>
                    <div>
                        <Typography variant="h3" gutterBottom className={`${styles['catamaran']} ${styles['title-text']}`}>
                            Finding What You Like
                        </Typography>
                        <Typography variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                        There is a lot of Spanish literature, and finding an author, book, or movement in literature that interests you is important.
                        Spanish Bites allows you do this by giving you a collection of passages from across history. 
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
