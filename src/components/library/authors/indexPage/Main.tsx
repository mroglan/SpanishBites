import {ClientAuthor} from '../../../../database/dbInterfaces'
import {Box, Typography, Grid} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink} from '../../../items/links'
import {findDate} from '../../../../utils/dates'
import styles from '../../../styles/ResourceList.module.css'
import {useState, useReducer, useMemo, useCallback} from 'react'
import Filters from './Filters'

interface Props {
    authors: ClientAuthor[];
}

interface Author extends ClientAuthor {
    numDOB: number;
    numDOD: number;
}

interface Filter {
    search: string;
    sort: string;
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
        case 'CHANGE_SORT':
            return {...state, sort: payload}
        case 'CHANGE_MODE':
            return {...state, mode: payload}
        default:
            return state
    }
}

const defaultFilters = {
    search: '',
    sort: 'lastName',
    mode: 'detailed'
}

const matchesSearch = (name:string, filter:string) => {
    if(!filter) return true
    const regex = new RegExp(filter, 'i')
    if(name.match(regex)) return true
    return false
}

const sortAuthors = (type:string, {a, b}:{a:Author; b:Author;}) => {
    if(type === 'firstName') {
        return a.firstName.localeCompare(b.firstName)
    }
    if(type === 'lastName') {
        return a.lastName.localeCompare(b.lastName)
    }
    if(type === 'dob') {
        return a.numDOB - b.numDOB
    }
    if(type === 'dod') {
        return a.numDOD - b.numDOD
    }
    return 0
}

export default function Main({authors:inputAuthors}:Props) {

    const authors = useMemo(() => {
        return inputAuthors.map(author => ({...author, numDOB: findDate(author.birthDate), numDOD: findDate(author.deathDate) || Infinity}))
    }, [inputAuthors])

    const [filters, filtersDispatch] = useReducer(filtersReducer, defaultFilters)

    const filteredAuthors = useMemo(() => {
        return authors.filter(author => (
            matchesSearch(author.firstName + ' ' + author.lastName, filters.search)
        )).sort((a, b) => sortAuthors(filters.sort, {a, b}))
    }, [filters])

    return (
        <Box px={3}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1">
                    Authors
                </Typography>
            </Box>
            <Box>
                <Filters filters={filters} dispatch={filtersDispatch} />
            </Box>
            {filters.mode === 'list' ? <Box className={styles['list-container']} mt={3}>
                {filteredAuthors.map(author => (
                    <Box my={1} key={author._id}>
                        <Link href="library/authors/[id]" as={`library/authors/${author._id}`}>
                            <a>
                                <PrimaryLink variant="body1">
                                    {author.firstName} {author.lastName}
                                </PrimaryLink>
                            </a>
                        </Link>
                    </Box>
                ))}
            </Box> : <Box className={styles['detailed-list-container']}>
                    {filteredAuthors.map(author => (
                        <Box my={1} key={author._id} style={{breakInside: 'avoid'}}>
                            <Grid container wrap="nowrap" spacing={2} alignItems="center">
                                <Grid item>
                                    <img src={author.image || '/no-profile.jpg'} alt={author.firstName + ' ' + author.lastName}
                                    title={author.firstName + ' ' + author.lastName} />
                                </Grid>
                                <Grid item style={{flexGrow: 1}}>
                                    <Box>
                                        <Link href="library/authors/[id]" as={`library/authors/${author._id}`}>
                                            <a>
                                                <PrimaryLink variant="body1">
                                                    {author.firstName} {author.lastName}
                                                </PrimaryLink>
                                            </a>
                                        </Link>
                                    </Box>
                                    <Box mt={1}>
                                        <Typography variant="body1">
                                            {author.birthDate} - {author.deathDate}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    ))}
            </Box>}
        </Box>
    )
}