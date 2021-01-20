import React, {useState, useMemo, useContext} from 'react'
import styles from '../../../styles/Library.module.css'
import {Grid, ClickAwayListener} from '@material-ui/core'
import {PrimaryLargeSearchBar} from '../../items/searchBars'
import {BluePrimaryIconButton} from '../../items/buttons'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'

import FiltersPanel, {initialFilters, Filters} from './FiltersPanel'
import {LibraryItemsContext} from './Main'
import {LibraryItems} from '../../../pages/library/index'
import { ClientUnpopulatedAuthor, ClientUnpopulatedBook, ClientPassage } from '../../../database/dbInterfaces'
import { FilterNoneSharp } from '@material-ui/icons'

interface Props {
    filters: Filters;
    setFilters: (value:Filters) => void;
    search: string;
    setSearch: (value:string) => void;
}

function searchThruAuthors(authors:ClientUnpopulatedAuthor[], search:string, filters:Filters) {
    return authors.filter(({firstName, lastName, timePeriod, birthDate, deathDate}) => {
        if(!`${firstName} ${lastName}`.match(new RegExp(search, 'i'))) return false
        if(filters.timePeriods.length > 0 && !filters.timePeriods.includes(timePeriod)) return false
        if(filters.birthDate && filters.birthDate !== birthDate) return false
        if(filters.deathDate && filters.deathDate !== deathDate) return false
        return true
    })
}

function searchThruBooks(books:ClientUnpopulatedBook[], search:string, filters:Filters) {
    return books.filter(({title, timePeriod, authors, genres}) => {
        if(!title.match(new RegExp(search, 'i'))) return false
        if(filters.timePeriods.length > 0 && !filters.timePeriods.includes(timePeriod)) return false
        if(filters.authors.length > 0 && !filters.authors.find(author => authors.includes(author))) return false
        if(filters.genres.length > 0 && !filters.genres.find(genre => genres.includes(genre))) return false
        return true
    })
}

function searchThruPassages(passages:ClientPassage[], search:string, filters:Filters) {
    return passages.filter(({name, book}) => {
        if(!name.match(new RegExp(search, 'i'))) return false
        if(filters.books.length > 0 && !filters.books.includes(book._id)) return false
        if(filters.timePeriods.length > 0 && !filters.timePeriods.includes(book.timePeriod)) return false
        if(filters.authors.length > 0 && !filters.authors.find(author => book.authors.includes(author))) return false
        if(filters.genres.length > 0 && !filters.genres.find(genre => book.genres.includes(genre))) return false
        return true
    })
}

function searchThruAllItems(libraryItems:LibraryItems, search:string, filters:Filters) {
    const items = [];
    items.push(...searchThruAuthors(libraryItems.authors, search, filters))
    items.push(...searchThruBooks(libraryItems.books, search, filters))
    items.push(...searchThruPassages(libraryItems.passages, search, filters))
    return items
}

export function findDisplayItems(libraryItems:LibraryItems, search:string, filters:Filters) {
    const {libraryItem:searchItem} = filters
    const lcSearch = search.toLowerCase()
    if(searchItem === 'none') return searchThruAllItems(libraryItems, lcSearch, filters)
    if(searchItem === 'authors') return searchThruAuthors(libraryItems.authors, lcSearch, filters)
    if(searchItem === 'books') return searchThruBooks(libraryItems.books, lcSearch, filters)
    return searchThruPassages(libraryItems.passages, lcSearch, filters)
}

export default function SearchPanel({filters, setFilters, search, setSearch}:Props) {

    const [dropDown, setDropDown] = useState(false)

    const closeFilters = () => setDropDown(false)

    const saveNewFilters = (newFilters:Filters) => {
        closeFilters()
        setFilters(newFilters)
    }

    const updateSearch = (input:string) => {
        setSearch(input)
    }

    return (
        <div className={styles['search-panel-root']}>
            <Grid style={{position: 'relative'}} container alignItems="center">
                <Grid item className={styles['searchbar-grid-item']}>
                    <PrimaryLargeSearchBar search={search} setSearch={updateSearch} disabled={dropDown} />
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <BluePrimaryIconButton disabled={dropDown} onClick={() => setDropDown(true)} >
                                <ExpandMoreOutlinedIcon />
                            </BluePrimaryIconButton>
                        </Grid>
                        <Grid item>
                            <BluePrimaryIconButton disabled={dropDown}>
                                <SettingsOutlinedIcon />
                            </BluePrimaryIconButton>
                        </Grid>
                    </Grid>
                </Grid>
                {dropDown && <div className={styles['filters-dropdown-container']}>
                    <FiltersPanel filters={filters} setFilters={saveNewFilters} closeFilters={closeFilters} />
                </div>}
            </Grid>
        </div>
    )
}