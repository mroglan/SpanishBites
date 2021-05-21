import React, {useMemo, useState} from 'react'
import {Box, Typography, Divider} from '@material-ui/core'
import Link from 'next/link'
import styles from '../../../../styles/Resource.module.css'
import {SecondaryLink} from '../../../items/links'
import TextDisplay from '../../../mui-rte/TextDisplay'
import {FullyPopulatedClientPassage, GeneralItem} from '../../../../database/dbInterfaces'
import PassageDisplay from './PassageDisplay'
import PremiumDisplay from './PremiumDisplay'
import useSWR from 'swr'
import {changeFavorites} from '../../../../utils/library'
import {GoldSecondaryButton} from '../../../items/buttons'

interface Props {
    passage: FullyPopulatedClientPassage;
}

export default function Main({passage}:Props) {

    const authors:any[] = passage.authors

    const {data: favorites, isValidating}:{data?:GeneralItem[];isValidating:boolean} = useSWR('/api/favorites', {shouldRetryOnError: false})

    const [loading, setLoading] = useState(false)

    const changeFavStatus = async (status:boolean) => {
        setLoading(true)
        const newFavorites = status ? [...favorites, {id: passage._id, type: 'authors'}] : favorites.filter(fav => fav.id !== passage._id)
        await changeFavorites(newFavorites)
        setLoading(false)
    }

    const isFavorite = useMemo(() => {
        if(!favorites) return false
        return !!favorites.find(fav => fav.id === passage._id)
    }, [isValidating, favorites])

    return (
        <div className={styles['passage-main']}>
            <div className={styles['passage-text-container']}>
                <Box>
                    <Typography variant="h4">
                        {passage.name}
                    </Typography>
                </Box>
                <Box mt={1}>
                    <Typography variant="h6">
                        {passage.book && <span>
                            From <Link href="/library/books/[id]" as={`/library/books/${passage.book._id}`}>
                            <a>
                                <SecondaryLink variant="inherit">
                                    <i>{passage.book.title}</i>
                                </SecondaryLink>
                            </a>
                        </Link>
                        </span>} 
                        {passage.authors.length > 0 && <span>
                            {' '}by {authors.map((author, i) => (
                                <Link key={i} href="/library/authors/[id]" as={`/library/authors/${author._id}`}>
                                    <a>
                                        <SecondaryLink variant="inherit">
                                            {author.firstName + ' ' + author.lastName}
                                            {i + 1 < authors.length ? ', ' : ''}
                                        </SecondaryLink>
                                    </a>
                                </Link>
                            ))}
                        </span>}
                    </Typography>
                </Box>
                <Box my={1}>
                    <Typography variant="body1">
                        {passage.desc}
                    </Typography>
                </Box>
                {favorites && <>
                    <Box py={2}>
                        {isFavorite ? <div>
                            <GoldSecondaryButton disabled={loading} onClick={() => changeFavStatus(false)}>
                                Remove from Favorites
                            </GoldSecondaryButton>
                        </div> : <GoldSecondaryButton disabled={loading} onClick={() => changeFavStatus(true)}>
                            Add to Favorites
                        </GoldSecondaryButton>}
                    </Box>
                </>}
                <Box flexGrow={1} width="90ch">
                    <PassageDisplay englishText={passage.englishText} spanishText={passage.spanishText} vocab={passage.vocab} />
                </Box>
            </div>
            <div className={styles['passage-premium-container']}>
                <PremiumDisplay />
            </div>
        </div>
    )
}