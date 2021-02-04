import React, {useContext, useMemo, useRef, useEffect, useState} from 'react'
import styles from '../../../styles/Library.module.css'
import {Chip, Grid} from '@material-ui/core'

import {Filters} from './FiltersPanel'
import {LibraryItemsContext} from './Main'
import {LibraryItems} from '../../../pages/library/index'

interface Props {
    filters: Filters;
    setFilters: (value:Filters) => void;
}

interface FilterChipProps {
    title: string;
    onDelete: () => void;
}

export function FilterChip({title, onDelete}:FilterChipProps) {
    return (
        <Grid style={{display: 'inline-block'}} item>
            <div data-testid="filter-chip">
                <Chip label={title} onDelete={onDelete} color="primary" />
            </div>
        </Grid>
    )
}

export default function FiltersDisplay({filters, setFilters}:Props) {

    const libraryItems = useContext(LibraryItemsContext)

    const timePeriods = useMemo(() => {
        return filters.timePeriods.map(period => libraryItems.timePeriods.find(p => p._id === period))
    }, [filters.timePeriods])

    const authors = useMemo(() => {
        return filters.authors.map(author => libraryItems.authors.find(a => a._id === author))
    }, [filters.authors])

    const genres = useMemo(() => {
        return filters.genres.map(genre => libraryItems.genres.find(g => g._id === genre))
    }, [filters.genres])

    const books = useMemo(() => {
        return filters.books.map(book => libraryItems.books.find(b => b._id === book))
    }, [filters.books])

    
    const deleteTimePeriod = (periodId:string) => {
        setFilters({...filters, timePeriods: filters.timePeriods.filter(period => period !== periodId)})
    }

    const deleteAuthor = (authorId:string) => {
        setFilters({...filters, authors: filters.authors.filter(author => author !== authorId)})
    }

    const deleteGenre = (genreId:string) => {
        setFilters({...filters, genres: filters.genres.filter(genre => genre !== genreId)})
    }

    const deleteBook = (bookId:string) => {
        setFilters({...filters, books: filters.books.filter(book => book !== bookId)})
    }

    return (
        <div className={styles['filters-display-root']}>
            <Grid container spacing={1} wrap="nowrap">
                {filters.libraryItem !== 'none' && <FilterChip title={filters.libraryItem} 
                onDelete={() => setFilters({...filters, libraryItem: 'none'})} />}
                {filters.birthDate && <FilterChip title={'Born ' + filters.birthDate}
                onDelete={() => setFilters({...filters, birthDate: ''})} />}
                {filters.deathDate && <FilterChip title={'Died ' + filters.deathDate}
                onDelete={() => setFilters({...filters, deathDate: ''})} />}
                {timePeriods.map(period => (
                    <FilterChip key={period._id} title={period.name} onDelete={() => deleteTimePeriod(period._id)} />
                ))}
                {authors.map(author => (
                    <FilterChip key={author._id} title={author.firstName + ' ' + author.lastName} onDelete={() => deleteAuthor(author._id)} />
                ))}
                {genres.map(genre => (
                    <FilterChip key={genre._id} title={genre.name} onDelete={() => deleteGenre(genre._id)} />
                ))}
                {books.map(book => (
                    <FilterChip key={book._id} title={book.title} onDelete={() => deleteBook(book._id)} />
                ))}
            </Grid>
        </div>
    )
}