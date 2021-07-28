import React, {useMemo} from 'react'
import PaperCarousel from '../items/PaperCarousel'
import {Box, Typography} from '@material-ui/core'
import {ClientCookieUser} from '../../database/dbInterfaces'
import useSWR from 'swr'
import Router from 'next/router'

interface Props {
    user: ClientCookieUser;
}

export default function RecentlyViewed({user}:Props) {

    const {data:items} = useSWR(`/api/auth/userinfo/get-recently-viewed?user=${user._id}`)

    const formattedItems = useMemo(() => {
        return (items || []).map(item => {
            return {
                type: item.type.substring(0, item.type.length - 1),
                title: item.type === 'authors' ? item.firstName + ' ' + item.lastName : item.type === 'passages' ? item.name : item.title,
                onClick: () => Router.push({pathname: `/library/${item.type}/${item._id}`})
            }
        })
    }, [items])

    return (
        <div>
            <Box textAlign="center" my={3}>
                <Typography variant="h4">
                    Recently Viewed
                </Typography>
            </Box>
            <Box>
                <PaperCarousel items={formattedItems} />
            </Box>
        </div>
    )
}