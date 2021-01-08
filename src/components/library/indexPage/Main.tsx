import React from 'react'
import styles from '../../../styles/Library.module.css'
import SideBar from './SideBar'

export default function Main() {

    return (
        <div className={styles['main-section-root']}>
            <aside className={styles['sidebar']}>
                <SideBar />
            </aside>
            <main>
                main section
            </main>
        </div>
    )
}