import React from 'react'
import { ClientBlogPost } from '../../../database/dbInterfaces';
import {Box, Typography, Paper} from '@material-ui/core'
import TextDisplay from '../../mui-rte/TextDisplay'
import BlogTextDisplay from '../../mui-rte/BlogTextDisplay'
import dayjs from 'dayjs'
import styles from '../../../styles/Blog.module.css'
import { Bite } from '../../items/bites';

interface Props {
    post: ClientBlogPost;
}

export default function Main({post}:Props) {

    const date = dayjs(post.releaseDate).format('MMMM D, YYYY')

    return (
        <div className={styles['full-container']}>
            <div>
                <Box mx="auto" className={styles['content-container']} maxWidth={800}>
                    <div className={styles['post-container']}>
                        <Box textAlign="center" mx={2} my={1}>
                            <Typography variant="body1">
                                {date}
                            </Typography>
                        </Box>
                        <Box textAlign="center" mx={2} my={1}>
                            <Typography variant="h2" component="h1">
                                {post.title}
                            </Typography>
                        </Box>
                        <Box mx={2} mt={2} mb={3}>
                            <Typography variant="h5">
                                {post.subtitle}
                            </Typography>
                        </Box>
                        <Box mx={2}>
                            <BlogTextDisplay text={post.content} />
                        </Box>
                    </div>
                </Box>
            </div>
        </div>
    )
}