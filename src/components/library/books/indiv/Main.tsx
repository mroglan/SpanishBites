import React, {useMemo, useState} from 'react'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import Link from 'next/link'
import styles from '../../../../styles/Resource.module.css'
import {SecondaryLink} from '../../../items/links'
import TextDisplay from '../../../mui-rte/TextDisplay'
import { ClientBook, GeneralItem } from '../../../../database/dbInterfaces'
import { GoldPrimaryButton, GoldSecondaryButton } from '../../../items/buttons'
import useSWR, {mutate} from 'swr'
import StarIcon from '@material-ui/icons/Star';
import {changeFavorites} from '../../../../utils/library'

interface Props {
    book: ClientBook;
}

export default function Main({book}:Props) {

    const {data: favorites, isValidating}:{data?:GeneralItem[];isValidating:boolean} = useSWR('/api/favorites', {shouldRetryOnError: false})

    const [loading, setLoading] = useState(false)

    const changeFavStatus = async (status:boolean) => {
        setLoading(true)
        const newFavorites = status ? [...favorites, {id: book._id, type: 'books'}] : favorites.filter(fav => fav.id !== book._id)
        await changeFavorites(newFavorites)
        setLoading(false)
    }

    const isFavorite = useMemo(() => {
        if(!favorites) return false
        return !!favorites.find(fav => fav.id === book._id)
    }, [isValidating, favorites])

    return (
        <>
            <div className={styles['img-container']}>
                <img src={book.image || '/no-profile.jpg'} title={book.title} />
                {favorites && isFavorite && <div className={styles.star}> 
                    <StarIcon fontSize="large" />
                </div>}
            </div>
            <div className={styles['content-container']}>
                <Paper elevation={3}>
                    <Box px={3}>
                        <Box>
                            <Typography variant="h3" component="h1">
                                {book.title}
                            </Typography>
                        </Box>
                        <Box pt={1}>
                            <Typography variant="h6">
                                By {book.authors.map((author, i) => (
                                    <Link key={i} href="/library/authors/[id]" as={`/library/authors/${author._id}`}>
                                        <a>
                                            <SecondaryLink variant="inherit">
                                                {author.firstName + ' ' + author.lastName}
                                                {i + 1 < book.authors.length ? ', ' : ''}
                                            </SecondaryLink>
                                        </a>
                                    </Link>
                                ))}
                            </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    {favorites && <>
                        <Box py={2} px={3}>
                            {isFavorite ? <div>
                                <GoldSecondaryButton disabled={loading} onClick={() => changeFavStatus(false)}>
                                    Remove from Favorites
                                </GoldSecondaryButton>
                            </div> : <GoldSecondaryButton disabled={loading} onClick={() => changeFavStatus(true)}>
                                Add to Favorites
                            </GoldSecondaryButton>}
                        </Box>
                        <Divider />
                    </>}
                    <Box px={3} pt={2}>
                        <Box>
                            <Typography variant="h6">
                                Time Period: <Link href="/library/timeperiods/[id]" as={`/library/timeperiods/${book.timePeriod._id}`}>
                                    <a>
                                        <SecondaryLink variant="inherit">
                                            {book.timePeriod.name}
                                        </SecondaryLink>
                                    </a>
                                </Link>
                            </Typography>
                        </Box>
                        <Box pt={1}>
                            <Typography variant="h6">
                                Genre: {book.genres.map((genre, i) => (
                                    <Link key={i} href="/library/genres/[id]" as={`/library/genres/${genre._id}`}>
                                        <a>
                                            <SecondaryLink variant="inherit">
                                                {genre.name}
                                                {i + 1 < book.genres.length ? ', ' : ''}
                                            </SecondaryLink>
                                        </a>
                                    </Link>
                                ))}
                            </Typography>
                        </Box>
                        <Box pt={1}>
                            <Box maxWidth="90ch">
                                <TextDisplay text={book.desc} />
                            </Box>
                        </Box>
                    </Box>
                </Paper>
            </div>
        </>
    )
}