import React from 'react'
import {ClientCookieUser} from '../../database/dbInterfaces'
import {Box, Grid, Typography, Paper, Divider} from '@material-ui/core'
import {BlueDenseButton} from '../items/buttons'
import Link from 'next/link'
import {BasicImageCarousel} from '../items/carousels'
import styles from '../../styles/BookClub.module.css'
import {Bite} from '../items/bites'
import BookClubSurvey from '../forms/BookClubSurvey'

interface Props {
    user: ClientCookieUser;
}

export function NotSignedIn() {
    return (
        <Box maxWidth={400}>
            <Box p={6} mx="auto">
                <Grid container justify="center" alignItems="center" spacing={3}>
                    <Grid xs={12} item>
                        <Box textAlign="center">
                            <Typography variant="body1">
                                Please sign in to access the survey.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item>
                        <Link href="/login">
                            <a>
                                <BlueDenseButton>
                                    <Typography variant="body1">
                                        Sign in
                                    </Typography>
                                </BlueDenseButton>
                            </a>
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default function Survey({user}:Props) {

    const images = [
        {src: "/bookclub/openingSurvey/de amor y de sombra.jpg", link: "https://www.goodreads.com/book/show/16532.Of_Love_and_Shadows"},
        {src: '/bookclub/openingSurvey/el fuego invisible.jpg', link: "https://www.penguinrandomhouse.com/books/605928/el-fuego-invisible--the-invisible-fire-by-javier-sierra/"},
        {src: '/bookclub/openingSurvey/historias de cronopios y de famas.jpg', link: 'https://www.goodreads.com/book/show/53423.Cronopios_and_Famas'},
        {src: '/bookclub/openingSurvey/la biblioteca de saint-malo.jpg', link: 'https://www.goodreads.com/book/show/55918613-the-librarian-of-saint-malo'},
        {src: '/bookclub/openingSurvey/la reina descalza.jpg', link: 'https://www.goodreads.com/ca/book/show/21423574-the-barefoot-queen'},
        {src: '/bookclub/openingSurvey/sidi.jpg', link: 'https://www.goodreads.com/en/book/show/50027888-sidi'}
    ]

    const books = [
        'El fuego invisible', 'La reina descalza', 'La biblioteca de saint-malo', 'Historias de cronopios y de famas',
        'De amor y de sombra', 'Nocturno de Chile', 'Sidi'
    ]

    return (
        <Box mx={3}>
            <Bite>
                <Paper className={styles['form-container']} elevation={1}>
                    <Grid item>
                        <Box textAlign="center" height={400}>
                            <BasicImageCarousel images={images} width={300} height={400} />
                        </Box>
                    </Grid>
                    <Grid item style={{flexGrow: 1}}>
                        <Box ml={3}>
                            <Box mr={6} my={2}>
                                <Typography variant="h5">
                                    Book Club Reccomendations
                                </Typography>
                            </Box>
                            <Box maxWidth={400}>
                                <Typography variant="body1">
                                    Click on the book covers to learn more about them.
                                </Typography>
                            </Box>
                            <Divider style={{margin: '1.5rem 0', width: 400}} />
                            <Box>
                                {user ? <BookClubSurvey books={books} onSubmit={(a, b) => null} /> : <NotSignedIn />}
                            </Box>
                        </Box>
                    </Grid>
                </Paper>
            </Bite>
        </Box>
    )
}