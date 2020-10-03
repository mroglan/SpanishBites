import {Event} from '../../database/dbInterfaces'
import {useState, useMemo, useEffect} from 'react'
import {FormControl, InputLabel, Select, MenuItem, Box} from '@material-ui/core'
import TimeLine from './TimeLine'
import {findDate} from '../../utils/dates'

interface Props {
    worldEvents: Event[];
    spainEvents: Event[];
}

export default function Organizer({worldEvents:inputWorld, spainEvents:inputSpain}:Props) {

    const [filter, setFilter] = useState('both')

    const spainEvents = useMemo(() => {
        return inputSpain.map(event => ({...event, type: 'spain', numDate: findDate(event.date)}))
    }, [])

    const worldEvents = useMemo(() => {
        return inputWorld.map(event => ({...event, type: 'world', numDate: findDate(event.date)}))
    }, [])

    const eventList = useMemo(() => {
        if(filter === 'both') {
            return [...spainEvents, ...worldEvents].sort((a, b) => a.numDate - b.numDate)
            .map(event => ({...event, side: event.type === 'spain' ? 'left' : 'right'}))
        }
        if(filter === 'spain') {
            return spainEvents.sort((a, b) => a.numDate - b.numDate).map((event, i) => ({...event, side: i % 2 === 0 ? 'left' : 'right'}))
        }
        return worldEvents.sort((a, b) => a.numDate - b.numDate).map((event, i) => ({...event, side: i % 2 === 0 ? 'left' : 'right'}))
    }, [filter])

    useEffect(() => {
        setTimeout(() => window.scroll({
            top: 0, left: 0
        }), 1)
    }, [filter])

    return (
        <div>
            <Box textAlign="center">
                <FormControl variant="outlined">
                    <InputLabel id="filter-label">Viewing</InputLabel>
                    <Select label="Viewing" labelId="filter-label" id="filter" value={filter} onChange={(e) => setFilter(e.target.value as string)}>
                        <MenuItem value="both">Spain and World Events</MenuItem>
                        <MenuItem value="spain">Spain Events</MenuItem>
                        <MenuItem value="world">World Events</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <TimeLine events={eventList} />
        </div>
    )
}