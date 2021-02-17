import React from 'react'
import {Dispatch, useState, useMemo, useEffect} from 'react'
import {Box, Grid, FormControl, InputLabel, Select, MenuItem} from '@material-ui/core'
import {PrimarySearchBar} from '../../../items/searchBars'

interface Props {
    filters: {search: string; mode: string;};
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
                    <FormControl style={{minWidth: 100}} variant="outlined">
                        <InputLabel id="mode-label">View mode</InputLabel>
                        <Select labelId="mode-label" label="View mode" value={filters.mode} inputProps={{'data-testid': 'book-mode-input'}}
                        onChange={(e) => dispatch({type: 'CHANGE_MODE', payload: e.target.value})}>
                            <MenuItem value="detailed">Detailed</MenuItem>
                            <MenuItem value="list">List</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}