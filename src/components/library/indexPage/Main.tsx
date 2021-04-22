import React, {useState, createContext, useMemo, useEffect, useCallback} from 'react'
import {Props, LibraryItems} from '../../../pages/library/index'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'
import DisplayPanel from './DisplayPanel'
import SearchPanel from './SearchPanel'
import {initialFilters, Filters} from './FiltersPanel'
import FiltersDisplay from './FiltersDisplay'
import BiteDisplay from './BiteDisplay'
import PopoutSidebar from './PopoutSidebar'
import {Box, NoSsr, Grid, Typography} from '@material-ui/core'
import Router, {useRouter} from 'next/router'
import {getQueryParams, getInfoFromQuery, findDisplayItems} from '../../../utils/library'

export const LibraryItemsContext = createContext<LibraryItems>({authors: [], books: [], timePeriods: [], genres: [], passages: [], 
    bite: {_id: '', name: '', author: '', image: '', work: '', text: '', desc: '', dates: []}})

const initialSettings = {
    viewMode: 'list',
    transitions: true
}
    
export function Loading() {

    return (
        <Grid container style={{height: '100%', width: '100%'}} alignItems="center" justify="center">
            <Grid item>
                <Typography variant="h5" color="secondary">
                    Loading...
                </Typography>
            </Grid>
        </Grid>
    )
}

export default function Main({items:libraryItems, query}:Props) {

    const [displayItems, setDisplayItems] = useState([])

    const [filters, setFilters] = useState(getInfoFromQuery(query).filters)
    const [search, setSearch] = useState(getInfoFromQuery(query).search)

    const [settings, setSettings] = useState(initialSettings)

    const [loading, setLoading] = useState(true)

    const updateQueryParams = useCallback((search:string, filters:Filters) => {
        const queryParams = getQueryParams(search, filters)
        Router.push({
            pathname: '/library',
            query: queryParams
        }, undefined, {shallow: true})
    }, [])

    useEffect(() => {
        if(loading) setLoading(false)
        if(filters.bite) return
        updateQueryParams(search, filters)
        setDisplayItems(findDisplayItems(libraryItems, search, filters))
    }, [filters, search])

    useMemo(() => {
        setLoading(true)
    }, [filters, search])

    const hideBite = () => setFilters({...filters, bite: false})

    return (
        <div className={styles['main-section-root']}>
            <aside data-testid="library-sidebar" className={`${styles['sidebar']} ${styles['main']}`}>
                <SideBar setFilters={setFilters} />
            </aside>
            <LibraryItemsContext.Provider value={libraryItems}>
                <main style={{display: filters.bite ? 'none' : 'grid'}} className={styles['user-panel-root']}>
                    <section data-testid="searchpanel-section">
                        <SearchPanel search={search} setSearch={setSearch} filters={filters} setFilters={setFilters}
                        settings={settings} setSettings={setSettings} />
                    </section>
                    <section data-testid="filtersdisplay-section" className={styles['filters-display-overflow']}>
                        <FiltersDisplay filters={filters} setFilters={setFilters} />
                    </section>
                    <section data-testid="displaypanel-section">
                        <NoSsr>
                            {loading ? <Loading /> : <DisplayPanel items={displayItems} />}
                        </NoSsr>
                        <aside className={styles['popout-sidebar']}>
                            <PopoutSidebar setFilters={setFilters} />
                        </aside> 
                    </section>
                </main>
                {filters.bite && <main data-testid="bitedisplay-section">
                    <BiteDisplay hideBite={hideBite} />
                </main>}
            </LibraryItemsContext.Provider>
        </div>
    )
}