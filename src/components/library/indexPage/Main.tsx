import React, {useState} from 'react'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'
import DisplayPanel from './DisplayPanel'
import SearchPanel from './SearchPanel'

export default function Main() {

    const [items, setItems] = useState(Array(20).fill(''))

    return (
        <div className={styles['main-section-root']}>
            <aside className={styles['sidebar']}>
                <SideBar />
            </aside>
            <main className={styles['user-panel-root']}>
                <section>
                    <SearchPanel />
                </section>
                <section>
                    <DisplayPanel items={items} />
                </section>
            </main>
        </div>
    )
}