import React from 'react'
import {ClientTimePeriod, ClientAuthor, ClientUnpopulatedAuthor, ClientUnpopulatedBook} from '../../../../database/dbInterfaces'
import {Box, Typography} from '@material-ui/core'
import List from './List'
import TabNav from './TabNav'
import styles from '../../../../styles/ResourceList.module.css'
import {useMemo, useCallback} from 'react'

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientUnpopulatedAuthor[];
    books: ClientUnpopulatedBook[];
}

export default function Main({timePeriods, authors, books}:Props) {

    const sortItems = useCallback((periods, items) => {
        const newItemsArray = periods.map(() => [])
        items.forEach(item => {
            for(let i = 0; i < periods.length; i++) {
                if(item.timePeriod === timePeriods[i]._id) {
                    newItemsArray[i].push(item)
                    break 
                }
            }
        })
        return newItemsArray
    }, [])

    const sortedAuthors = useMemo(() => {
        return sortItems(timePeriods, authors)
    }, [timePeriods, authors]) 

    const sortedBooks = useMemo(() => {
        const popBooks = books.map(book => ({...book, authors: book.authors.map(author => {
            return authors.find(a => a._id === author) || {}
        })}))
        return sortItems(timePeriods, popBooks)
    }, [timePeriods, books]) 

    return (
        <Box className={styles['timeline-root']}>
            <Box>
                <Box textAlign="center">
                    <Typography variant="h2" component="h1">
                        Time Periods
                    </Typography>
                </Box>
                <Box mx="auto" maxWidth={600}>
                    <List timePeriods={timePeriods} authors={sortedAuthors} books={sortedBooks} />
                </Box>
            </Box>
            <div data-testid="timePeriodTabNav" style={{marginTop: '1rem'}}>
                <TabNav timePeriods={timePeriods} />
            </div>
        </Box>
    )
}