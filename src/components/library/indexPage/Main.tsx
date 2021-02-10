import React, {useState, createContext, useMemo} from 'react'
import {Props, LibraryItems} from '../../../pages/library/index'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'
import DisplayPanel from './DisplayPanel'
import SearchPanel, {findDisplayItems} from './SearchPanel'
import {initialFilters} from './FiltersPanel'
import FiltersDisplay from './FiltersDisplay'
import BiteDisplay from './BiteDisplay'
import PopoutSidebar from './PopoutSidebar'
import {Box} from '@material-ui/core'

export const LibraryItemsContext = createContext<LibraryItems>({authors: [], books: [], timePeriods: [], genres: [], passages: [], 
    bite: {_id: '', name: '', author: '', image: '', work: '', text: '', desc: '', dates: []}})

export default function Main({items:libraryItems}:Props) {

    const [displayItems, setDisplayItems] = useState([])

    const [filters, setFilters] = useState(initialFilters)
    const [search, setSearch] = useState('')

    useMemo(() => {
        if(filters.bite) return
        setDisplayItems(findDisplayItems(libraryItems, search, filters))
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
                        <SearchPanel search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
                    </section>
                    <section data-testid="filtersdisplay-section" className={styles['filters-display-overflow']}>
                        <FiltersDisplay filters={filters} setFilters={setFilters} />
                    </section>
                    <section data-testid="displaypanel-section">
                        <DisplayPanel items={displayItems} />
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