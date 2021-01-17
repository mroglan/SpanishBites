import React, {useState, createContext} from 'react'
import {Props} from '../../../pages/library/index'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'
import DisplayPanel from './DisplayPanel'
import SearchPanel from './SearchPanel'

export const LibraryItemsContext = createContext<any>({})

export default function Main({items:libraryItems}:Props) {

    const [displayItems, setDisplayItems] = useState(Array(20).fill(''))

    return (
        <div className={styles['main-section-root']}>
            <aside className={styles['sidebar']}>
                <SideBar />
            </aside>
            <main className={styles['user-panel-root']}>
                <section>
                    <LibraryItemsContext.Provider value={libraryItems}>
                        <SearchPanel />
                    </LibraryItemsContext.Provider>
                </section>
                <section>
                    <DisplayPanel items={displayItems} />
                </section>
            </main>
        </div>
    )
}