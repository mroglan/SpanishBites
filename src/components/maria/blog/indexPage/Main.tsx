import React from 'react'
import { ClientBlogPost } from '../../../../database/dbInterfaces'
import styles from '../../../../styles/Blog.module.css'
import {Box, Paper, Typography, Grid} from '@material-ui/core'
import BlogTextDisplay from '../../../mui-rte/BlogTextDisplay'
import dayjs from 'dayjs'
import {BlueDenseButton} from '../../../items/buttons'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSprings, animated } from 'react-spring'
import Link from 'next/link'

interface Props {
    posts: ClientBlogPost[];
}

export default function Main({posts}:Props) {

    const [springs, setSprings] = useSprings<any>(posts.length, p => ({scale: 1}))

    const animateLarger = (index:number) => {
        setSprings(i => {
            if(i === index) return {scale: 1.05}
            return {scale: 1}
        })
    }

    const animateSmaller = () => {
        setSprings(i => {
            return {scale: 1}
        })
    }

    return (
        <div className={styles['full-container']}>
            <div>
                <Box mx="auto" maxWidth={800} mt={1} className={styles['post-list-container']}>
                    <div>
                        {posts.map((post, i) => (
                            <Link key={i} href="/maria/blog/[date]" as={`/maria/blog/${post.releaseDate}`}>
                                <a>
                                    <Box style={{cursor: 'pointer'}} my={3}>
                                        <animated.div onMouseEnter={() => animateLarger(i)} onMouseLeave={() => animateSmaller()}
                                            style={{transform: springs[i].scale.interpolate(s => `scale(${s})`)}}>
                                            <Paper elevation={3}>
                                                <Box px={2} py={1}>
                                                    <Box mb={2}>
                                                        <Typography variant="h4">
                                                            {post.title}
                                                        </Typography>
                                                    </Box>
                                                    <Box maxHeight={140} overflow="hidden">
                                                        <BlogTextDisplay text={post.content} />
                                                    </Box>
                                                    <Box>
                                                        <Grid container spacing={3} alignItems="center" justify="space-between">
                                                            <Grid item>
                                                                <Box>
                                                                    <Typography variant="overline">
                                                                        {dayjs(post.releaseDate).format('DD/MM/YYYY')}
                                                                    </Typography>
                                                                </Box>
                                                            </Grid>
                                                            <Grid item>
                                                                <Grid container spacing={1} alignItems="center">
                                                                    <Grid item>
                                                                        <Box>
                                                                            <Typography color="primary" variant="h5">
                                                                                Read More
                                                                            </Typography>
                                                                        </Box>
                                                                    </Grid>
                                                                    <Grid item>
                                                                        <Box>
                                                                            <ArrowForwardIcon color="primary" />
                                                                        </Box>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </animated.div>
                                    </Box>
                                </a>
                            </Link>
                        ))}
                    </div>
                </Box>
            </div>
        </div>
    )
}