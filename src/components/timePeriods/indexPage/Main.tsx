import {ClientTimePeriod} from '../../../database/dbInterfaces'
import {Box, Typography} from '@material-ui/core'
import List from './List'
import TabNav from './TabNav'
import styles from '../../../styles/ResourceList.module.css'

interface Props {
    timePeriods: ClientTimePeriod[];
}

export default function Main({timePeriods}) {

    return (
        <Box className={styles['timeline-root']}>
            <Box>
                <Box textAlign="center">
                    <Typography variant="h2" component="h1">
                        Time Periods
                    </Typography>
                </Box>
                <Box mx="auto" maxWidth={600}>
                    <List timePeriods={timePeriods} />
                </Box>
            </Box>
            <Box mt="1rem">
                <TabNav timePeriods={timePeriods} />
            </Box>
        </Box>
    )
}