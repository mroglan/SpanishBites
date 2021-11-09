import React, {useState} from 'react'
import { ClientBlogPost } from '../../../../database/dbInterfaces'
import styles from '../../../../styles/Blog.module.css'
import {Box, Paper, Typography, Grid} from '@material-ui/core'
import BlogTextDisplay from '../../../mui-rte/BlogTextDisplay'
import dayjs from 'dayjs'
import {BluePrimaryButton} from '../../../items/buttons'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { useSprings, animated } from 'react-spring'
import Link from 'next/link'
import axios from 'axios'

interface Props {
    posts: ClientBlogPost[];
}

export default function Main({posts:dbPosts}:Props) {

    const [posts, setPosts] = useState(dbPosts)

    const [springs, setSprings] = useSprings<any>(posts.length, p => ({scale: 1}))

    const [loadingMore, setLoadingMore] = useState(false)
    const [morePostsToLoad, setMorePostsToLoad] = useState(dbPosts.length >= 10)

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

    const loadMore = async () => {
        setLoadingMore(true)
        
        const afterPost = [posts[posts.length - 1].releaseDate, posts[posts.length - 1]._id]

        try {
            const {data:newPosts} = await axios({
                method: 'POST',
                url: '/api/maria/blog/load-more-posts',
                data: {afterPost}
            })

            if(newPosts.length < 10) setMorePostsToLoad(false)
            setPosts([...posts, ...newPosts])
        } catch(e) {}

        setLoadingMore(false)
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
                                        <animated.div data-testid="post-container" 
                                        onMouseEnter={() => animateLarger(i)} onMouseLeave={() => animateSmaller()}
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
                    {morePostsToLoad && <Box my={2} pb={2}>
                        <Box mx="auto" maxWidth={300} textAlign="center">
                            <BluePrimaryButton onClick={() => loadMore()} disabled={loadingMore} fullWidth>
                                Load More
                            </BluePrimaryButton>
                        </Box>
                    </Box>}
                </Box>
            </div>
        </div>
    )
}