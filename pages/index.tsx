import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {} from '@material-ui/core'

export default function Home() {

    return (
        <>
            <Head>
                <title>Spanish Bites: The Best of Spanish Literature</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    Spanish Bites Title
                </div>
                <div className={styles['sub-carousel']}>
                    Author Carousel
                </div>
                <div className={styles['side-bar']}>
                    Important Links
                </div>
                <div className={styles.main}>
                    Main Section for Bites and Such
                </div>
                <div className={styles['side-bar']}>
                    News
                </div>
                <div className={styles.footer}>
                    Footer
                </div>
            </div>
        </>
    )
}