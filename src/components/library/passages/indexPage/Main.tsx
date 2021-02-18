import React, {useState, useReducer, useMemo, useCallback} from 'react'
import {ClientPassage} from '../../../../database/dbInterfaces'
import {Box, Typography, Grid} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink} from '../../../items/links'
import {findDate} from '../../../../utils/dates'
import styles from '../../../../styles/ResourceList.module.css'
import {matchesSearch} from '../../../../utils/regex'
import Filters from '../../books/indexPage/Filters'

interface Props {
    passages: ClientPassage[];
}

interface Filter {
    search: string;
    mode: string;
}

interface Action {
    type: string;
    payload: any;
}

const filtersReducer = (state:Filter, {type, payload}:Action) => {
    switch(type) {
        case 'CHANGE_SEARCH':
            return {...state, search: payload}
        case 'CHANGE_MODE':
            return {...state, mode: payload}
        default:
            return state
    }
}

const defaultFilters = {
    search: '',
    mode: 'detailed'
}

export default function Main({passages}:Props) {

    const [filters, filtersDispatch] = useReducer(filtersReducer, defaultFilters)

    const filteredPassages = useMemo(() => {
        return passages.filter(passage => matchesSearch(passage.name, filters.search))
    }, [filters])

    return (
        <Box px={3}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1">
                    Passages
                </Typography>
            </Box>
            <Box>
                <Filters filters={filters} dispatch={filtersDispatch} />
            </Box>
            {filters.mode === 'list' ? <Box className={styles['list-container']} mt={3}>
                {filteredPassages.map(passage => (
                    <Box my={1} key={passage._id}>
                        <div data-testid="list-passage-item">
                            <Link href="/library/passages/[id]" as={`/library/passages/${passage._id}`}>
                                <a data-testid="passage-name">
                                    <PrimaryLink variant="body1">
                                        {passage.name}
                                    </PrimaryLink>
                                </a>
                            </Link>
                        </div>
                    </Box>
                ))}
            </Box> : <Box className={styles['detailed-list-container']}>
                    {filteredPassages.map(passage => (
                        <Box my={1} key={passage._id} style={{breakInside: 'avoid'}}>
                            <div data-testid="detailed-passage-item">
                                <Grid container wrap="nowrap" spacing={2} alignItems="center">
                                    <Grid item>
                                        <img src={passage.book.image || '/no-profile.jpg'} alt={passage.name}
                                        title={passage.name} data-testid="passageImg" />
                                    </Grid>
                                    <Grid item style={{flexGrow: 1}}>
                                        <Box>
                                            <Link href="/library/passages/[id]" as={`/library/passages/${passage._id}`}>
                                                <a data-testid="passageName">
                                                    <PrimaryLink variant="body1">
                                                        {passage.name}
                                                    </PrimaryLink>
                                                </a>
                                            </Link>
                                        </Box>
                                        <Box mt={1}>
                                            <Typography data-testid="passage-authors" variant="body1">
                                                <i>{passage.book.title}</i>
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </div>
                        </Box>
                    ))}
            </Box>}
        </Box>
    )
}