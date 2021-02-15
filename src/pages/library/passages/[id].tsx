import React from 'react'
import {GetStaticPaths, GetStaticProps, GetStaticPropsContext} from 'next'
import {ObjectId} from 'mongodb'
import {DBPassage, FullyPopulatedClientPassage} from '../../../database/dbInterfaces'
import {getPassage} from '../../../utils/passages'
import database from '../../../database/database'
import useSWR from 'swr'
import Head from 'next/head'
import styles from '../../../styles/Resource.module.css'
import MainHeader from '../../../components/nav/MainHeader'
import ResourceNotFound from '../../../components/error/ResourceNotFound'
import Main from '../../../components/library/passages/Main'

interface Props {
    passage: FullyPopulatedClientPassage;
}

export default function Passage({passage:dbPassage}:Props) {

    if(!dbPassage) {
        <ResourceNotFound />
    }

    const {data: {passage}} = useSWR(`/api/passages/${dbPassage._id || 'undefined'}`, {initialData: {passage: dbPassage}})

    if(!passage || !passage._id) {
        return <ResourceNotFound />
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
                    <MainHeader bg="none" />
                </div>
                <div>
                    <Main passage={passage} />
                </div>
                <div className={styles.footer}>
                    footer
                </div>
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async (ctx:GetStaticPropsContext) => {
    const id = ctx.params.id as string
    if(!ObjectId.isValid(id)) return {props: {passage: {}}}
    const passage = await getPassage(new ObjectId(id))

    return {props: {passage: JSON.parse(JSON.stringify(passage || {}))}, revalidate: 60}
}

export const getStaticPaths:GetStaticPaths = async () => {
    const db = await database()
    const passages:DBPassage[] = await db.collection('passages').find({}).toArray()

    const paths = passages.map(passage => ({params: {id: passage._id.toString()}}))

    return {fallback: true, paths}
}