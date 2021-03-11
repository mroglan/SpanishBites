import React from 'react'
import styles from '../../styles/Bite.module.css'

export function Bite({children}) {

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                {children}
                <div className={`${styles['circle']} ${styles['c1']}`} />
                <div className={`${styles['circle']} ${styles['c2']}`} />
                <div className={`${styles['circle']} ${styles['c3']}`} />
                <div className={`${styles['circle']} ${styles['c4']}`} /> 
            </div>
        </div>
    )
}