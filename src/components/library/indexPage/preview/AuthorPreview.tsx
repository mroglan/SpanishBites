import React, {useState} from 'react'
import {ClientUnpopulatedAuthor} from '../../../../database/dbInterfaces'
import {Box, Typography} from '@material-ui/core'
import styles from '../../../../styles/Library.module.css'
import {BulletList} from '../../../items/lists'

interface Props {
    author: ClientUnpopulatedAuthor;
}

export default function AuthorPreview({author}:Props) {

    return (
        <Box>
            <Box textAlign="center">
                <Typography variant="h4">
                    {author.firstName} {author.lastName}
                </Typography>
            </Box>
            <Box textAlign="center" mt={2}>
                <Typography variant="h5">
                    {author.birthDate} - {author.deathDate}
                </Typography>
            </Box>
            <Box mt={2} maxWidth={700} mx="auto" className={styles['picture-grid']}>
                <div className={styles['preview-image-container']}>
                    <img src={author.image || '/no-profile.jpg'} />
                </div>
                <div>
                    <BulletList>
                        {author.keyPoints.map((point, i) => (
                            <li key={i}>
                                <Typography variant="body1">
                                    {point}
                                </Typography>
                            </li>
                        ))}
                    </BulletList>
                </div>
            </Box>
        </Box>
    )
}