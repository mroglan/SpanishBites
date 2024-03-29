import React, {useMemo, useState} from 'react'
import styles from '../../../../styles/Resource.module.css'
import {Paper, Box, Typography, Divider} from '@material-ui/core'
import Link from 'next/link'
import {SecondaryLink} from '../../../items/links'
import {BulletList} from '../../../items/lists'
import { ClientAuthor, GeneralItem, ClientCookieUser } from '../../../../database/dbInterfaces'
import { GoldPrimaryButton, GoldSecondaryButton } from '../../../items/buttons'
import useSWR, {mutate} from 'swr'
import StarIcon from '@material-ui/icons/Star';
import axios from 'axios'
import {changeFavorites} from '../../../../utils/library'
import TextDisplay from '../../../mui-rte/TextDisplay'
import Preview from '../../basic/Preview'

interface Props {
    author: ClientAuthor;
    user: ClientCookieUser;
}

export default function Main({author, user}:Props) {

    const {data: favorites, isValidating}:{data?:GeneralItem[];isValidating:boolean} = useSWR('/api/favorites', {shouldRetryOnError: false})

    const {data: premiumInfo}:{data?:{detailedInfo:string}} = useSWR(`/api/authors/${author._id}/premium`, {shouldRetryOnError: false})

    const [loading, setLoading] = useState(false)

    const changeFavStatus = async (status:boolean) => {
        setLoading(true)
        const newFavorites = status ? [...favorites, {id: author._id, type: 'authors'}] : favorites.filter(fav => fav.id !== author._id)
        await changeFavorites(newFavorites)
        setLoading(false)
    }

    const isFavorite = useMemo(() => {
        if(!favorites) return false
        return !!favorites.find(fav => fav.id === author._id)
    }, [isValidating, favorites])

    return (
        <>
            <div className={styles['general-info']}>
                <div className={styles['img-container']}>
                    <img src={author.image || '/no-profile.jpg'} title={author.firstName + ' ' + author.lastName} />
                    {favorites && isFavorite && <div className={styles.star}> 
                        <StarIcon fontSize="large" />
                    </div>}
                </div>
                <div className={styles['content-container']}>
                    <Paper elevation={3}>
                        <Box px={3}>
                            <Box>
                                <Typography variant="h3" component="h1">
                                    {author.firstName + ' ' + author.lastName}
                                </Typography>
                            </Box>
                            <Box pt={1}>
                                <Typography variant="h6">
                                    {author.birthDate} - {author.deathDate},{' '}
                                    <Link href="/library/timeperiods/[id]" as={`/library/timeperiods/${author.timePeriod?._id}`}>
                                        <a>
                                            <SecondaryLink variant="inherit">
                                                {author.timePeriod?.name}
                                            </SecondaryLink>
                                        </a>
                                    </Link>
                                </Typography>
                            </Box>
                            <Divider />
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
                                <Divider />
                            </>}
                            <Box pt={2}>
                                <div className={styles['author-grid-container']}>
                                    <div>
                                        <Box pl={3} pb={1}>
                                            <Typography variant="h5">
                                                Key Points
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <BulletList>
                                                {author.keyPoints.map((point, i) => (
                                                    <li key={i}>
                                                        <Typography style={{maxWidth: '50ch'}} variant="body1">
                                                            {point}
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </BulletList>
                                        </Box>
                                    </div>
                                    <div>
                                        <Box pl={3} pb={1}>
                                            <Typography variant="h5">
                                                Relevant Works
                                            </Typography>
                                        </Box>
                                        <Box>
                                            <BulletList>
                                                {author.relevantWorks.map((work, i) => {
                                                    if(work.link) {
                                                        return (
                                                            <li key={i}>
                                                                <a href={work.link}>
                                                                    <SecondaryLink variant="body1">
                                                                        {work.name}
                                                                    </SecondaryLink>
                                                                </a>
                                                            </li>
                                                        )
                                                    }
                                                    return (
                                                        <li key={i}>
                                                            <Typography variant="body1">
                                                                {work.name}
                                                            </Typography>
                                                        </li>
                                                    )
                                                })}
                                            </BulletList>
                                        </Box>
                                    </div>
                                </div>
                            </Box>
                        </Box>
                    </Paper>
                    {!premiumInfo && <Box mt={2} mx="auto" maxWidth={500}>
                        <Preview user={user} type="author" id={author._id}/>
                    </Box>}
                </div>
            </div>
            {premiumInfo && <Box mt={3}>
                <div className={styles['detailed-info']}>
                    <Paper elevation={3}>
                        <Box px={3} py={3}>
                            <Box className={styles['title-container']} mb={2} ml={2}>
                                <Typography variant="h4">
                                    Detailed Info
                                </Typography>
                            </Box>
                            <Box ml={2} maxWidth={600}>
                                <TextDisplay text={premiumInfo.detailedInfo} />
                            </Box>
                        </Box>
                    </Paper>
                </div>
            </Box>}
        </>
    )
}