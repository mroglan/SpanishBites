import {Dispatch, useState, useMemo, useEffect} from 'react'
import {Box, Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {PrimarySearchBar} from '../../../items/searchBars'

interface Props {
    filters: {search: string; sort: string; mode: string;};
    dispatch: Dispatch<{type: string; payload: any;}>;
}

export default function Filters({filters, dispatch}:Props) {

    const [search, setSearch] = useState('')

    useEffect(() => {
        dispatch({type: 'CHANGE_SEARCH', payload: search})
    }, [search])

    return (
        <Box>
            <Grid container spacing={3} alignItems="center">
                <Grid item>
                    <PrimarySearchBar search={search} setSearch={setSearch} />
                </Grid>
                <Grid item>
                    <FormControl variant="outlined">
                        <InputLabel id="sort">Sorting by</InputLabel>
                        <Select labelId="sort" label="Sorting by" value={filters.sort} onChange={(e) => dispatch({type: 'CHANGE_SORT', payload: e.target.value})}>
                            <MenuItem value="firstName">First Name</MenuItem>
                            <MenuItem value="lastName">Last Name</MenuItem>
                            <MenuItem value="dob">Date of Birth</MenuItem>
                            <MenuItem value="dod">Date of Death</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl style={{minWidth: 100}} variant="outlined">
                        <InputLabel id="mode-label">View mode</InputLabel>
                        <Select labelId="mode-label" label="View mode" value={filters.mode} onChange={(e) => dispatch({type: 'CHANGE_MODE', payload: e.target.value})}>
                            <MenuItem value="detailed">Detailed</MenuItem>
                            <MenuItem value="list">List</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}