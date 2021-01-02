import {ClientTimePeriod, ClientAuthor, ClientUnpopulatedAuthor} from '../../../../database/dbInterfaces'
import {Box, Typography} from '@material-ui/core'
import List from './List'
import TabNav from './TabNav'
import styles from '../../../../styles/ResourceList.module.css'
import {useMemo} from 'react'

interface Props {
    timePeriods: ClientTimePeriod[];
    authors: ClientUnpopulatedAuthor[];
}

export default function Main({timePeriods, authors}:Props) {

    const sortedAuthors = useMemo(() => {
        const newAuthorArray = timePeriods.map(() => [])
        authors.forEach(author => {
            for(let i = 0; i < timePeriods.length; i++) {
                if(author.timePeriod === timePeriods[i]._id) {
                    newAuthorArray[i].push(author)
                    break
                }
            }
        })
        return newAuthorArray
    }, [timePeriods, authors]) 

    return (
        <Box className={styles['timeline-root']}>
            <Box>
                <Box textAlign="center">
                    <Typography variant="h2" component="h1">
                        Time Periods
                    </Typography>
                </Box>
                <Box mx="auto" maxWidth={600}>
                    <List timePeriods={timePeriods} authors={sortedAuthors} />
                </Box>
            </Box>
            <Box mt="1rem">
                <TabNav timePeriods={timePeriods} />
            </Box>
        </Box>
    )
}