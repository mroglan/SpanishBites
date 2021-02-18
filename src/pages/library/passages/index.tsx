import {GetStaticProps} from 'next'
import {ClientPassage} from '../../../database/dbInterfaces'
import {getAllPassages} from '../../../utils/passages'
import styles from '../../../styles/ResourceList.module.css'
import Head from 'next/head'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import useSWR from 'swr'
import Main from '../../../components/library/passages/indexPage/Main'

interface Props {
    passages: ClientPassage[];
}

export default function Passages({passages:dbPassages}:Props) {

    const {data: {passages}} = useSWR('/api/passages', {initialData: {passages: dbPassages}})

    return (
        <>
            <Head>
                <title>Passages | Spanish Bites</title>
            </Head>
            <div className={styles.root}>
                <div>
                    <MainHeader bg="none" />
                </div>
                <div>
                    <Main passages={passages} />
                </div>
                <div>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const passages = await getAllPassages()

    return {props: {passages: JSON.parse(JSON.stringify(passages))}, revalidate: 60}
}