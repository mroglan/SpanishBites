import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Library.module.css'
import { GetStaticProps } from 'next'
import {ClientUnpopulatedAuthor, ClientUnpopulatedBook, ClientGenre, ClientTimePeriod, ClientPassage, ClientSpanishBite} from '../../database/dbInterfaces'
import useSWR from 'swr'

import MainHeader from '../../components/nav/MainHeader'
import MainFooter from '../../components/nav/MainFooter'
import MainWrapper from '../../components/library/indexPage/MainWrapper'

import {getAllAuthors, getAllUnpopulatedAuthors} from '../../utils/authors'
import {getAllBooks, getAllUnpopulatedBooks} from '../../utils/books'
import {getAllTimePeriods} from '../../utils/timePeriods'
import {getAllGenres} from '../../utils/genres'
import {getAllPassages} from '../../utils/passages'
import {getTodayBite} from '../../utils/bites'

export interface LibraryItems {
    authors: ClientUnpopulatedAuthor[];
    books: ClientUnpopulatedBook[];
    timePeriods: ClientTimePeriod[];
    genres: ClientGenre[];
    passages: ClientPassage[];
    bite: ClientSpanishBite;
}

export interface Props {
    items: LibraryItems;
}

export const initialSettings = {
    viewMode: 'carousel', 
    transitions: true
}

export default function Library({items}:Props) {

    const {data:user} = useSWR('/api/auth/getuser', {shouldRetryOnError: false})
    
    return (
        <>
            <Head>
                <title>
                    Spanish Bites Library
                </title>
            </Head>
            <div className={styles.root}>
                <div style={{position: 'sticky', top: 0, zIndex: 2000}}>
                    <MainHeader bg="none" user={user} />
                </div>
                <div>
                    <MainWrapper items={items} />
                </div>
            </div>
            <div>
                <MainFooter />
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const [authors, books, timePeriods, genres, passages, bite] = await Promise.all([
        getAllUnpopulatedAuthors(), getAllUnpopulatedBooks(), getAllTimePeriods(), getAllGenres(), getAllPassages(), getTodayBite()
    ])

    return {props: {
        items: {
            authors: JSON.parse(JSON.stringify(authors)),
            books: JSON.parse(JSON.stringify(books)),
            timePeriods: JSON.parse(JSON.stringify(timePeriods)),
            genres: JSON.parse(JSON.stringify(genres)),
            passages: JSON.parse(JSON.stringify(passages)),
            bite: JSON.parse(JSON.stringify(bite))
        },
    }, revalidate: 1800}
}