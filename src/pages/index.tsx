import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Box} from '@material-ui/core'
import MainHeader from '../components/nav/MainHeader'
import MainSideBar from '../components/nav/MainSideNav'

export default function Home() {

    return (
        <>
            <Head>
                <title>Spanish Bites: The Best of Spanish Literature</title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader />
                </div>
                <div className={styles['sub-ad']}>
                    <Box height={200} display="flex" alignItems="center" justifyContent="center">
                        Buy Premium Promotion
                    </Box>
                </div>
                <div className={styles['side-bar']}>
                    <MainSideBar />
                </div>
                <div className={styles.main}>
                    Main Section for Bites and Such
                </div>
                <div className={styles.footer}>
                    Footer
                </div>
            </div>
        </>
    )
}

//redeploy