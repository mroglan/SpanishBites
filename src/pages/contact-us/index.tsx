import React from 'react'
import styles from '../../styles/Basic.module.css'
import SimpleHeader from '../../components/nav/SimpleHeader'
import MainFooter from '../../components/nav/MainFooter'
import Main from '../../components/contact-us/Main'

export default function ContactUs() {

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <SimpleHeader bg="none" />
            </div>
            <div className={styles.main}>
                <Main />
            </div>
            <div className={styles.footer}>
                <MainFooter />
            </div>
        </div>
    )
}