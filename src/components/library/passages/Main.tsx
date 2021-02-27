import React from 'react'
import {Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import styles from '../../../styles/Resource.module.css'
import {SecondaryLink} from '../../items/links'
import TextDisplay from '../../mui-rte/TextDisplay'
import {FullyPopulatedClientPassage} from '../../../database/dbInterfaces'
import PassageDisplay from './PassageDisplay'
import PremiumDisplay from './PremiumDisplay'

interface Props {
    passage: FullyPopulatedClientPassage;
}

export default function Main({passage}:Props) {

    const authors:any[] = passage.authors?.length > 0 ? passage.authors : passage.book.authors

    return (
        <div className={styles['passage-main']}>
            <div className={styles['passage-text-container']}>
                <Box>
                    <Typography variant="h4">
                        {passage.name}
                    </Typography>
                </Box>
                <Box mt={1}>
                    <Typography variant="h6">
                        From <Link href="/library/books/[id]" as={`/library/books/${passage.book._id}`}>
                            <a>
                                <SecondaryLink variant="inherit">
                                    <i>{passage.book.title}</i>
                                </SecondaryLink>
                            </a>
                        </Link> by {authors.map((author, i) => (
                            <Link key={i} href="/library/authors/[id]" as={`/library/authors/${author._id}`}>
                                <a>
                                    <SecondaryLink variant="inherit">
                                        {author.firstName + ' ' + author.lastName}
                                        {i + 1 < authors.length ? ', ' : ''}
                                    </SecondaryLink>
                                </a>
                            </Link>
                        ))}
                    </Typography>
                </Box>
                <Box my={1}>
                    <Typography variant="body1">
                        {passage.desc}
                    </Typography>
                </Box>
                <Box flexGrow={1} width="90ch">
                    <PassageDisplay englishText={passage.englishText} spanishText={passage.spanishText} vocab={passage.vocab} />
                </Box>
            </div>
            <div className={styles['passage-premium-container']}>
                <PremiumDisplay />
            </div>
        </div>
    )
}