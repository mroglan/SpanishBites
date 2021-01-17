import React from 'react'
import Head from 'next/head'
import styles from '../../styles/Library.module.css'
import { GetStaticProps } from 'next'
import {getAllUnpopulatedAuthors} from '../../utils/authors'
import {getAllUnpopulatedBooks} from '../../utils/books'
import {getAllTimePeriods} from '../../utils/timePeriods'
import {getAllGenres} from '../../utils/genres'
import {getAllPassages} from '../../utils/passages'
import {ClientAuthor, ClientBook, ClientGenre, ClientTimePeriod, ClientPassage} from '../../database/dbInterfaces'

import MainHeader from '../../components/nav/MainHeader'
import Main from '../../components/library/indexPage/Main'

export interface Props {
    items: {
        authors: ClientAuthor[];
        books: ClientBook[];
        timePeriods: ClientTimePeriod[];
        genres: ClientGenre[];
        passages: ClientPassage[];
    };
}

export default function Library({items:dbItems}:Props) {

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
                    <Main items={dbItems} />
                </div>
            </div>
            <div>
                footer
            </div>
        </>
    )
}

export const getStaticProps:GetStaticProps = async () => {

    const [authors, books, timePeriods, genres, passages] = await Promise.all([getAllUnpopulatedAuthors(), 
        getAllUnpopulatedBooks(), getAllTimePeriods(), getAllGenres(), getAllPassages()])
    
    return {props: {items: {
        authors: JSON.parse(JSON.stringify(authors)),
        books: JSON.parse(JSON.stringify(books)),
        timePeriods: JSON.parse(JSON.stringify(timePeriods)),
        genres: JSON.parse(JSON.stringify(genres)),
        passages: JSON.parse(JSON.stringify(passages))
    }}}

}