import React, {useState, createContext, useMemo, useEffect, useCallback} from 'react'
import {GeneralItem} from '../../../database/dbInterfaces'
import {LibraryItems} from '../../../pages/library/index'
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
import ListDisplay from './ListDisplay'
import axios from 'axios'
import {parseCookies} from 'nookies'
import { Settings } from './Settings'
import useSWR from 'swr'

export const LibraryItemsContext = createContext<LibraryItems>({authors: [], books: [], timePeriods: [], genres: [], passages: [], 
    bite: {_id: '', name: '', author: '', image: '', work: '', text: '', desc: '', dates: []}})

export const FavoritesContext = createContext<GeneralItem[]>([])

interface Props {
    items: LibraryItems;
    settings: Settings;
    query: any;
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

export default function Main({items:libraryItems, query, settings:initialSettings}:Props) {

    const {data: favorites, isValidating}:{data?:GeneralItem[];isValidating:boolean} = useSWR('/api/favorites', {shouldRetryOnError: false})

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
        if(isValidating) return
        if(!filters.favorites) return
        setDisplayItems(findDisplayItems(libraryItems, search, filters, favorites || []))
    }, [isValidating])

    useEffect(() => {
        if(loading) setLoading(false)
        updateQueryParams(search, filters)
        if(filters.bite) return
        if(!favorites && isValidating) return
        setDisplayItems(findDisplayItems(libraryItems, search, filters, favorites || []))
    }, [filters, search])

    useMemo(() => {
        setLoading(true)
    }, [filters, search])

    const hideBite = () => setFilters({...filters, bite: false})

    useEffect(() => {
        const cookieSettings = parseCookies().settings
        if(JSON.stringify(settings) === JSON.stringify(cookieSettings)) return
        const saveSettings = async () => {
            try {
                await axios({
                    method: 'POST',
                    url: '/api/library/settings',
                    data: {settings}
                })
            } catch(e) {
                console.log('error saving settings to cookies')
            }
        }
        saveSettings()
    }, [settings])

    return (
        <div className={styles['main-section-root']}>
            <aside data-testid="library-sidebar" className={`${styles['sidebar']} ${styles['main']}`}>
                <SideBar setFilters={setFilters} filters={filters} />
            </aside>
            <FavoritesContext.Provider value={favorites}>
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
                                {loading ? <Loading /> : 
                                settings.viewMode === 'list' ? <ListDisplay items={displayItems} /> : 
                                <DisplayPanel items={displayItems} settings={settings} />}
                            </NoSsr>
                            <aside className={styles['popout-sidebar']}>
                                <PopoutSidebar setFilters={setFilters} filters={filters} />
                            </aside> 
                        </section>
                    </main>
                    {filters.bite && <main data-testid="bitedisplay-section">
                        <BiteDisplay hideBite={hideBite} />
                    </main>}
                </LibraryItemsContext.Provider>
            </FavoritesContext.Provider>
        </div>
    )
}