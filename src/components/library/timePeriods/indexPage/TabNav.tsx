import React from 'react'
import {Box, List, ListItem, Typography} from '@material-ui/core'
import {ClientTimePeriod} from '../../../../database/dbInterfaces'
import styles from '../../../../styles/ResourceList.module.css'
import Scrollspy from 'react-scrollspy'
import {useMemo} from 'react'

interface Props {
    timePeriods: ClientTimePeriod[];
}

export default function TabNav({timePeriods}:Props) {

    const ids = useMemo(() => timePeriods.map(period => period._id), [timePeriods])

    const onClick = (id:string) => {
        window.location.href = `#${id}`
    }

    return (
        <Box className={styles['nav-root']}>
            <Scrollspy componentTag={List} items={ids} currentClassName={styles['nav-selected']}>
                {timePeriods.map((period, i) => (
                    <ListItem className={styles['nav-item']} onClick={() => onClick(period._id)} key={i}>
                        <div>
                            <Box py={1} pr={2} pl={1}>
                                <Typography data-testid="periodTabName" variant="body1">{period.name}</Typography>
                            </Box>
                        </div>
                    </ListItem>
                ))}
            </Scrollspy>
        </Box>
    )
}

