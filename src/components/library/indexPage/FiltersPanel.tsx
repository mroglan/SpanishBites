import React, {useState, useReducer, useContext, useMemo} from 'react'
import styles from '../../../styles/Library.module.css'
import {Grid, Typography, Box, FormControl, Select, MenuItem, InputLabel, TextField} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import {ClientAuthor, ClientBook, ClientGenre, ClientTimePeriod} from '../../../database/dbInterfaces'

import {LibraryItemsContext} from './Main'
import {GrayDenseButton, BlueDenseButton} from '../../items/buttons'

export const initialFilters = {
    libraryItem: 'none',
    timePeriods: [],
    birthDate: '',
    deathDate: '',
    authors: [],
    genres: [],
    books: []
}

function filtersReducer(state, {type, payload}:{type:string;payload:string|string[];}) {
    switch(type) {
        case 'CHANGE_LIBRARY_ITEM':
            return {...initialFilters, libraryItem: payload}
        case 'CHANGE_TIME_PERIODS':
            return {...state, timePeriods: payload}
        case 'CHANGE_BIRTHDATE':
            return {...state, birthDate: payload}
        case 'CHANGE_DEATHDATE':
            return {...state, deathDate: payload}
        case 'CHANGE_AUTHORS':
            return {...state, authors: payload}
        case 'CHANGE_GENRES':
            return {...state, genres: payload}
        case 'CHANGE_BOOKS':
            return {...state, books: payload}
        default:
            return state
    }
}

interface TimePeriodSelectProps {
    value: string[];
    dispatch: any;
    periods: ClientTimePeriod[];
}

interface LifeSpanProps {
    birthDate: string;
    deathDate: string;
    dispatch: any;
}

interface AuthorSelectProps {
    value: string[];
    dispatch: any;
    authors: ClientAuthor[];
}

interface GenreSelectProps {
    value: string[];
    dispatch: any;
    genres: ClientGenre[];
}

interface BookSelectProps {
    value: string[];
    dispatch: any;
    books: ClientBook[];
}

function BookSelect({value, dispatch, books}:BookSelectProps) {

    const options = books.map(book => ({_id: book._id, label: book.title}))

    const valArray = value.map(val => options.find(option => option._id === val))

    const updateFilter = (e, values:{_id:string;label:string}[]) => {
        const ids = values.map(value => value._id)
        dispatch({type: 'CHANGE_BOOKS', payload: ids})
    }

    return (
        <Grid container alignItems="center" wrap="nowrap" spacing={3}>
            <Grid style={{minWidth: 130}} item>
                <Typography className={styles['text-faded']} variant="body1">
                    <InputLabel htmlFor="book-input">
                        From book(s)
                    </InputLabel>
                </Typography>
            </Grid>
            <Grid style={{flexGrow: 1}} item>
                <FormControl fullWidth>
                    <Autocomplete multiple id="book-input" options={options} getOptionLabel={(option:any) => option.label}
                    getOptionSelected={(option, value) => option._id === value._id}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                    )} onChange={updateFilter} value={valArray}
                    /> 
                </FormControl>
            </Grid>
        </Grid>
    )
}

function GenreSelect({value, dispatch, genres}:GenreSelectProps) {

    const options = genres.map(genre => ({_id: genre._id, label: genre.name}))

    const valArray = value.map(val => options.find(option => option._id === val))

    const updateFilter = (e, values:{_id:string;label:string;}[]) => {
        const ids = values.map(value => value._id)
        dispatch({type: 'CHANGE_GENRES', payload: ids})
    }

    return (
        <Grid container alignItems="center" wrap="nowrap" spacing={3}>
            <Grid style={{minWidth: 130}} item>
                <Typography className={styles['text-faded']} variant="body1">
                    <InputLabel htmlFor="genre-input">
                        With genre(s)
                    </InputLabel>
                </Typography>
            </Grid>
            <Grid style={{flexGrow: 1}} item>
                <FormControl fullWidth>
                    <Autocomplete multiple id="genre-input" options={options} getOptionLabel={(option:any) => option.label}
                    getOptionSelected={(option, value) => option._id === value._id}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                    )} onChange={updateFilter} value={valArray}
                    /> 
                </FormControl>
            </Grid>
        </Grid>
    )
}

function AuthorSelect({value, dispatch, authors}:AuthorSelectProps) {

    const options = authors.map(author => ({_id: author._id, label: author.firstName + ' ' + author.lastName}))

    const valArray = value.map(val => options.find(option => option._id === val))

    const updateFilter = (e, values:{_id:string;label:string;}[]) => {
        const ids = values.map(value => value._id)
        dispatch({type: 'CHANGE_AUTHORS', payload: ids})
    }

    return (
        <Grid container alignItems="center" wrap="nowrap" spacing={3}>
            <Grid item>
                <Typography className={styles['text-faded']} variant="body1">
                    <InputLabel htmlFor="author-input">
                        By
                    </InputLabel>
                </Typography>
            </Grid>
            <Grid style={{flexGrow: 1}} item>
                <FormControl fullWidth>
                    <Autocomplete multiple id="author-input" options={options} getOptionLabel={(option:any) => option.label}
                    getOptionSelected={(option, value) => option._id === value._id}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                    )} onChange={updateFilter} value={valArray}
                    /> 
                </FormControl>
            </Grid>
        </Grid>
    )
}

function LifeSpan({birthDate, deathDate, dispatch}:LifeSpanProps) {

    return (
        <Grid container wrap="nowrap" alignItems="center" spacing={3}>
            <Grid style={{minWidth: 140}} item>
                <Typography className={styles['text-faded']} variant="body1">
                    <InputLabel htmlFor="birthdate-input">
                        Who lived from
                    </InputLabel>
                </Typography>
            </Grid>
            <Grid style={{flexGrow: 1}} item>
                <TextField variant="standard" id="birthdate-input" value={birthDate} 
                onChange={(e) => e.target.value.length < 5 && dispatch({type: 'CHANGE_BIRTHDATE', payload: e.target.value})} />
            </Grid>
            <Grid item>
                <Typography className={styles['text-faded']} variant="body1">
                    <InputLabel htmlFor="deathdate-input">
                        to
                    </InputLabel>
                </Typography>
            </Grid>
            <Grid style={{flexGrow: 1}} item>
                <TextField variant="standard" id="deathdate-input" value={deathDate}
                onChange={(e) => e.target.value.length < 5 && dispatch({type: 'CHANGE_DEATHDATE', payload: e.target.value})} />
            </Grid>
        </Grid>
    )
}

function TimePeriodSelect({value, dispatch, periods}:TimePeriodSelectProps) {

    const options = [...periods.map(period => ({_id: period._id, title: period.name,
         label: `${period.name} (${period.dateRange[0]}-${period.dateRange[1]})`}))]

    const valArray = value.map(val => options.find(option => option._id === val))

    const updateFilter = (e, values:{_id:string,label:string,title:string}[]) => {
        const ids = values.map(value => value._id)
        dispatch({type: 'CHANGE_TIME_PERIODS', payload: ids})
    }

    return (
        <Grid container alignItems="center" wrap="nowrap" spacing={3}>
            <Grid style={{minWidth: 100}} item>
                <Typography className={styles['text-faded']} variant="body1">
                    <InputLabel htmlFor="time-period-input">
                        From time period(s)
                    </InputLabel>
                </Typography>
            </Grid>
            <Grid style={{flexGrow: 1}} item>
                <FormControl fullWidth>
                    <Autocomplete multiple id="time-period-input" options={options} getOptionLabel={(option:any) => option.title}
                    getOptionSelected={(option, value) => option._id === value._id}
                    renderInput={(params) => (
                        <TextField {...params} variant="standard" />
                    )} onChange={updateFilter} 
                    renderOption={(option) => {
                        return <option key={option._id} value={option}>{option.label}</option>
                    }} value={valArray}
                    /> 
                </FormControl>
            </Grid>
        </Grid>
    )
}

export default function FilterPanel({filters:startFilters, setFilters, closeFilters}) {

    const libraryItems = useContext(LibraryItemsContext)

    const [filters, dispatch] = useReducer(filtersReducer, startFilters)
    const [saving, setSaving] = useState(false)

    const saveChanges = () => {
        setSaving(true)
        setFilters(filters)
    }

    return (
        <div>
            <Box px={0}>
                <Grid container alignItems="center" spacing={3}>
                    <Grid item>
                        <Typography className={styles['text-faded']} variant="body1">
                            <InputLabel id="library-item-label">
                                Searching for
                            </InputLabel>
                        </Typography>
                    </Grid>
                    <Grid style={{flexGrow: 1}} item>
                        <FormControl fullWidth>
                            <Select labelId="library-item-label" value={filters.libraryItem} 
                            onChange={(e) => dispatch({type: 'CHANGE_LIBRARY_ITEM', payload: e.target.value as string})}>
                                <MenuItem value="none">All Categories</MenuItem>
                                <MenuItem value="authors">Authors</MenuItem>
                                <MenuItem value="books">Books</MenuItem>
                                <MenuItem value="passages">Passages</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
            {filters.libraryItem === 'authors' ? <Box>
                <Box>
                    <TimePeriodSelect value={filters.timePeriods} dispatch={dispatch} periods={libraryItems.timePeriods} />
                </Box>
                <Box>
                    <LifeSpan dispatch={dispatch} birthDate={filters.birthDate} deathDate={filters.deathDate} />
                </Box>
            </Box> : filters.libraryItem === 'books' ? <Box>
                <Box>
                    <AuthorSelect value={filters.authors} dispatch={dispatch} authors={libraryItems.authors} />
                </Box>
                <Box>
                    <GenreSelect value={filters.genres} dispatch={dispatch} genres={libraryItems.genres} />
                </Box>
                <Box>
                    <TimePeriodSelect value={filters.timePeriods} dispatch={dispatch} periods={libraryItems.timePeriods} />
                </Box>
            </Box> : filters.libraryItem === 'passages' ? <Box>
                <Box>
                    <BookSelect value={filters.books} dispatch={dispatch} books={libraryItems.books} />
                </Box>
                <Box>
                    <AuthorSelect value={filters.authors} dispatch={dispatch} authors={libraryItems.authors} />
                </Box>
                <Box>
                    <GenreSelect value={filters.genres} dispatch={dispatch} genres={libraryItems.genres} />
                </Box>
                <Box>
                    <TimePeriodSelect value={filters.timePeriods} dispatch={dispatch} periods={libraryItems.timePeriods} />
                </Box>
            </Box> : ''}
            <Box mt={3}>
                <Grid container spacing={3} justify="flex-end" alignItems="center">
                    <Grid item>
                        <GrayDenseButton disabled={saving} onClick={closeFilters}>
                            Cancel
                        </GrayDenseButton>
                    </Grid>
                    <Grid item>
                        <BlueDenseButton disabled={saving} onClick={() => saveChanges()}>
                            Save Filters
                        </BlueDenseButton>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}