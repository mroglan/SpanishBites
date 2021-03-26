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
                            Collaborating With Others
                        </Typography>
                        <Typography variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                            A great way to explore literature is by discussing it with others. 
                            Check out our book club where you can chat with others and Dr. Melendez about the current book we’re reading.
                        </Typography>
                    </div>
                </div>
                <div className={styles['c1-graphic-container']}>
                    <img src="/about/bookClub.png" />
                </div>
            </div>
            <div className={`${styles['gray-triangle']} ${styles['triangle']}`} />
        </Box>
    )
}
