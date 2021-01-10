import React from 'react'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'
import DisplayPanel from './DisplayPanel'

export default function Main() {

    return (
        <div className={styles['main-section-root']}>
            <aside className={styles['sidebar']}>
                <SideBar />
            </aside>
            <main className={styles['user-panel-root']}>
                <section>
                    <div style={{height: 100}} />
                </section>
                <section>
                    <DisplayPanel />
                </section>
            </main>
        </div>
    )
}