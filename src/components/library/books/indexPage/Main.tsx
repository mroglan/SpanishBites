import React, {useState, useReducer, useMemo, useCallback} from 'react'
import {AuthorPopulatedClientBook} from '../../../../database/dbInterfaces'
import {Box, Typography, Grid} from '@material-ui/core'
import Link from 'next/link'
import {PrimaryLink} from '../../../items/links'
import {findDate} from '../../../../utils/dates'
import styles from '../../../../styles/ResourceList.module.css'
import {matchesSearch} from '../../../../utils/regex'
import Filters from './Filters'

interface Props {
    books: AuthorPopulatedClientBook[];
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

export default function Main({books}:Props) {

    const [filters, filtersDispatch] = useReducer(filtersReducer, defaultFilters)

    const filteredBooks = useMemo(() => {
        return books.filter(book => (
            matchesSearch(book.title, filters.search)
        ))
    }, [filters])

    return (
        <Box px={3}>
            <Box textAlign="center">
                <Typography variant="h2" component="h1">
                    Books
                </Typography>
            </Box>
            <Box>
                <Filters filters={filters} dispatch={filtersDispatch} />
            </Box>
            {filters.mode === 'list' ? <Box className={styles['list-container']} mt={3}>
                {filteredBooks.map(book => (
                    <Box my={1} key={book._id}>
                        <div data-testid="list-book-item">
                            <Link href="/library/books/[id]" as={`/library/books/${book._id}`}>
                                <a data-testid="book-name">
                                    <PrimaryLink variant="body1">
                                        {book.title}
                                    </PrimaryLink>
                                </a>
                            </Link>
                        </div>
                    </Box>
                ))}
            </Box> : <Box className={styles['detailed-list-container']}>
                    {filteredBooks.map(book => (
                        <Box my={1} key={book._id} style={{breakInside: 'avoid'}}>
                            <div data-testid="detailed-book-item">
                                <Grid container wrap="nowrap" spacing={2} alignItems="center">
                                    <Grid item>
                                        <img src={book.image || '/no-profile.jpg'} alt={book.title}
                                        title={book.title} data-testid="book-img" />
                                    </Grid>
                                    <Grid item style={{flexGrow: 1}}>
                                        <Box>
                                            <Link href="/library/books/[id]" as={`/library/books/${book._id}`}>
                                                <a data-testid="book-name">
                                                    <PrimaryLink variant="body1">
                                                        {book.title}
                                                    </PrimaryLink>
                                                </a>
                                            </Link>
                                        </Box>
                                        <Box mt={1}>
                                            <Typography data-testid="book-authors" variant="body1">
                                                {book.authors.map((author, i) => (
                                                    author.firstName + ' ' + author.lastName + (i + 1 === book.authors.length ? '' : ', ' )
                                                ))}
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

