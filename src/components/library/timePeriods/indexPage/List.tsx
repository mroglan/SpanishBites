import React from 'react'
import {ClientTimePeriod, ClientUnpopulatedAuthor} from '../../../../database/dbInterfaces'
import styles from '../../../../styles/ResourceList.module.css'
import {Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink} from '../../../items/links'
import TextDisplay from '../../../mui-rte/TextDisplay'
import {SmallCollage} from '../../../items/collage'

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientUnpopulatedAuthor[][];
}

export default function List({timePeriods, authors}:Props) {

    return (
        <Box>
            {timePeriods.map((period, i) => (
                <div className={`${styles['period-root']} ${i + 1 < timePeriods.length ? styles['timeline-line'] : ''}`} key={i}>
                    <div className={`${styles['period-content']} ${i > 0 ? styles['top-dot'] : ''} ${i + 1 < timePeriods.length ? styles['bottom-dot'] : ''}`}>
                        <Box textAlign="center">
                            <Link href="/library/timeperiods/[id]" as={`/library/timeperiods/${period._id}`}>
                                <a data-testid="periodListItemName">
                                    <PrimaryLink variant="h5">
                                        {period.name} ({period.dateRange[0]} - {period.dateRange[1]})
                                    </PrimaryLink>
                                </a>
                            </Link>
                        </Box>
                        <Box>
                            <div data-testid="periodListItemIntro">
                                <TextDisplay text={period.intro} />
                            </div>
                        </Box>
                        <Box>
                            <div data-testid="periodListItemAuthorCollage">
                                <SmallCollage images={authors[i].map(author => ({url: author.image, linkHref: '/library/authors/[id]', linkAs: `/library/authors/${author._id}`}))} 
                                labels={authors[i].map(author => author.firstName + ' ' + author.lastName)} />
                            </div>
                        </Box>
                        <div className={styles['timeperiod-marker']} id={period._id} />
                    </div>
                </div>
            ))}
        </Box>
    )
}