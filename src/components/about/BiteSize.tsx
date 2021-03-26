import React from 'react'
import styles from '../../styles/About.module.css'
import {Box, Typography} from '@material-ui/core'
import Image from 'next/image'

export default function BiteSize() {

    return (
        <Box my={6} mx={6}>
            <div className={styles['c1-container']}>
                <div className={styles['c1-graphic-container']}>
                    <img src="/about/magnifyText.png" />
                </div>
                <div className={styles['c1-text-container']}>
                    <div>
                        <Typography variant="h3" gutterBottom className={`${styles['catamaran']} ${styles['title-text']}`}>
                            Making Literature Bite Size
                        </Typography>
                        <Typography variant="body1" className={`${styles['catamaran']} ${styles['body-text']}`}>
                            Every day, you can visit the Spanish Bites library to see a new “bite” of Spanish literature, 
                            which briefly explain a figurative or syntactical device used in literature with a short excerpt. 
                        </Typography>
                    </div>
                </div>
            </div>
        </Box>
    )
}
