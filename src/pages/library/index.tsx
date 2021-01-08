import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Library.module.css'

import MainHeader from '../../components/nav/MainHeader'

export default function Library() {

    return (
        <>
            <Head>
                <title>
                    Spanish Bites Library
                </title>
            </Head>
            <div className={styles.root}>
                <div>
                    <MainHeader bg="none" />
                </div>
                <div>
                    main
                </div>
                <div>
                    footer
                </div>
            </div>
        </>
    )
}