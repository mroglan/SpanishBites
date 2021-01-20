import React, {useState, createContext, useMemo} from 'react'
import {Props, LibraryItems} from '../../../pages/library/index'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'
import DisplayPanel from './DisplayPanel'
import SearchPanel, {findDisplayItems} from './SearchPanel'
import {initialFilters} from './FiltersPanel'
import FiltersDisplay from './FiltersDisplay'
import {Box} from '@material-ui/core'

export const LibraryItemsContext = createContext<LibraryItems>({authors: [], books: [], timePeriods: [], genres: [], passages: []})

export default function Main({items:libraryItems}:Props) {

    const [displayItems, setDisplayItems] = useState(Array(20).fill(''))

    const [filters, setFilters] = useState(initialFilters)
    const [search, setSearch] = useState('')

    useMemo(() => {
        setDisplayItems(findDisplayItems(libraryItems, search, filters))
    }, [filters, search])

    return (
        <div className={styles['main-section-root']}>
            <aside className={styles['sidebar']}>
                <SideBar />
            </aside>
            <main className={styles['user-panel-root']}>
                <LibraryItemsContext.Provider value={libraryItems}>
                    <section>
                        <SearchPanel search={search} setSearch={setSearch} filters={filters} setFilters={setFilters} />
                    </section>
                    <section className={styles['filters-display-overflow']}>
                        <FiltersDisplay filters={filters} setFilters={setFilters} />
                    </section>
                </LibraryItemsContext.Provider>
                <section>
                    <DisplayPanel items={displayItems} />
                </section>
            </main>
        </div>
    )
}