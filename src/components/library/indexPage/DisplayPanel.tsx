import React, {useEffect, useRef, useState} from 'react'
import styles from '../../../styles/Library.module.css'

export default function DisplayPanel() {

    const heightRef = useRef<HTMLElement>()

    const [rows, setRows] = useState(0)

    useEffect(() => {
        setRows(Math.floor(heightRef.current.clientHeight / 260))
    }, [])

    return (
        <div className={styles['display-panel-root']}>
            <aside>

            </aside>
            <main ref={heightRef} style={{position: 'relative'}}>
                <div className={styles['shelf-background']}>
                    {Array(rows).fill('').map((_, i) => (
                        <div key={i} className={styles['display-panel-row']}>
                            <div />
                            <div className={styles.shelf} />
                        </div>
                    ))}
                </div>
            </main>
            <aside>

            </aside>
        </div>
    )
}