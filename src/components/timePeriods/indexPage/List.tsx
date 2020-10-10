import {ClientTimePeriod} from '../../../database/dbInterfaces'
import styles from '../../../styles/ResourceList.module.css'
import {Box, Typography} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink} from '../../items/links'
import TextDisplay from '../../mui-rte/TextDisplay'

interface Props {
    timePeriods: ClientTimePeriod[];
}

export default function List({timePeriods}:Props) {

    return (
        <Box>
            {timePeriods.map((period, i) => (
                <div className={`${styles['period-root']} ${i + 1 < timePeriods.length ? styles['timeline-line'] : ''}`} key={i}>
                    <div className={`${styles['period-content']} ${i > 0 ? styles['top-dot'] : ''} ${i + 1 < timePeriods.length ? styles['bottom-dot'] : ''}`}>
                        <Box textAlign="center">
                            <Link href="/timeperiods/[id]" as={`/timeperiods/${period._id}`}>
                                <a>
                                    <PrimaryLink variant="h5">
                                        {period.name} ({period.dateRange[0]} - {period.dateRange[1]})
                                    </PrimaryLink>
                                </a>
                            </Link>
                        </Box>
                        <Box>
                            <TextDisplay text={period.intro} />
                        </Box>
                        <div className={styles['timeperiod-marker']} id={period._id} />
                    </div>
                </div>
            ))}
        </Box>
    )
}