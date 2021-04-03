import React from 'react'
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next'
import {client} from '../../../database/fauna-db'
import {query as q} from 'faunadb'
import {DBPassage, FullyPopulatedClientPassage} from '../../../database/dbInterfaces'
import {getPassage} from '../../../utils/passages'
import useSWR from 'swr'
import axios from 'axios'
import Head from 'next/head'
import styles from '../../../styles/Resource.module.css'
import MainHeader from '../../../components/nav/MainHeader'
import MainFooter from '../../../components/nav/MainFooter'
import ResourceNotFound from '../../../components/error/ResourceNotFound'
import Main from '../../../components/library/passages/Main'

interface Props {
    passage: FullyPopulatedClientPassage;
}

export default function Passage({passage}:Props) {

    if(!passage || !passage._id) {
        return <ResourceNotFound />
    }

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})

    if(user) {
        axios({
            method: 'POST',
            url: '/api/auth/userinfo/add-recently-viewed',
            data: {
                item: {id: passage._id, type: 'passages'}
            }
        })
    }

    return (
        <>
            <Head>
                <title>
                    {passage.name} | Spanish Bites
                </title>
            </Head>
            <div className={styles.root}>
                <div className={styles.header}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div>
                    <Main passage={passage} />
                </div>
                <div className={styles.footer}>
                    <MainFooter />
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {
    try {
        const id = ctx.params.id as string

        const passage = await getPassage(id)

        return {props: {passage: JSON.parse(JSON.stringify(passage || {}))}, revalidate: 1800}
    } catch(e) {
        return {props: {passage: {}}}
    }
}

export const getStaticPaths:GetStaticPaths = async () => {

    const passages:any = await client.query(
        q.Paginate(q.Match(q.Index('all_passages')))
    )

    const paths = passages.data.map(passage => ({params: {id: passage.id}}))

    return {fallback: true, paths}
}