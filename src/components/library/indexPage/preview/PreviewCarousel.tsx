import React, {memo, useContext, useMemo, useState} from 'react'
import Link from 'next/link'
import styles from '../../../../styles/Library.module.css'
import {Grid, Box, Tooltip} from '@material-ui/core'
import {BlueDenseButton, BluePrimaryIconButton, GoldPrimaryIconButton} from '../../../items/buttons'
import CloseIcon from '@material-ui/icons/Close';
import LaunchIcon from '@material-ui/icons/Launch';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import useSWR, { mutate } from 'swr'
import {FavoritesContext} from '../Main'
import axios from 'axios'

import AuthorPreview from './AuthorPreview'
import BookPreview from './BookPreview'
import PassagePreview from './PassagePreview'

interface Props {
    item: any;
    closePreview: () => void;
}

export default memo(function PreviewCarousel({item, closePreview}:Props) {

    const favorites = useContext(FavoritesContext)

    const [marked, setMarked] = useState(false)

    useMemo(() => {
        if(!favorites) return
        const isFavorite = !!favorites.find(fav => fav.id === item._id)
        if(marked === isFavorite) return
        setMarked(isFavorite)
    }, [item, favorites])

    const changeFavoriteStatus = async (status:boolean) => {
        setMarked(status)
        let newFavorites = []
        if(status) {
            newFavorites = [...favorites, {id: item._id, type: item.type}]
        } else {
            newFavorites = favorites.filter(fav => fav.id !== item._id)
        }
        try {
            await axios({
                method: 'POST',
                url: '/api/favorites',
                data: {
                    operation: 'update-favorites',
                    favorites: newFavorites
                }
            })
        } catch(e) {}
        mutate('/api/favorites')
    }

    return (
        <div className={styles['preview-root']}>
            <div className={styles['preview-content']}>
                <div className={styles['preview-visit-container']}>
                    <Tooltip title={marked ? 'Remove Favorite' : 'Add Favorite'}>
                        {marked ? <GoldPrimaryIconButton onClick={() => changeFavoriteStatus(false)}>
                            <StarIcon />
                        </GoldPrimaryIconButton> : <GoldPrimaryIconButton onClick={() => changeFavoriteStatus(true)}>
                            <StarBorderIcon />
                        </GoldPrimaryIconButton>}
                    </Tooltip>
                </div>
                {item.type === 'author' ? <AuthorPreview author={item} /> : 
                item.type === 'book' ? <BookPreview book={item} /> : 
                <PassagePreview passage={item} /> }
                <div className={styles['preview-close-container']}>
                    <BluePrimaryIconButton data-testid="closepreview-btn" onClick={() => closePreview()} >
                        <CloseIcon />
                    </BluePrimaryIconButton>
                </div>
            </div>
            <div>
                <Box mb={1}>
                    <Grid container justify="center">
                        <Grid item>
                            <Link href={`/library/${item.type}s/[id]`} as={`/library/${item.type}s/${item._id}`}>
                                <a>
                                    <BlueDenseButton>
                                        Visit Page
                                    </BlueDenseButton>
                                </a>
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    )
})