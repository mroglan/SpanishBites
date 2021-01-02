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
                        <Typography variant="body1">{period.name}</Typography>
                    </ListItem>
                ))}
            </Scrollspy>
        </Box>
    )
}

