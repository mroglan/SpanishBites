import React, {useMemo, useContext} from 'react'
import {ClientUnpopulatedBook, ClientUnpopulatedAuthor} from '../../../../database/dbInterfaces'
import {Box, Typography} from '@material-ui/core'
import styles from '../../../../styles/Library.module.css'
import TextDisplay from '../../../mui-rte/TextDisplay'

interface PreviewBook extends Omit<ClientUnpopulatedBook, 'authors'> {
    authors: ClientUnpopulatedAuthor[];
}

interface Props {
    book: PreviewBook;
}

export default function BookPreview({book}:Props) {

    const bookAuthors = useMemo(() => book.authors.map(({firstName, lastName}) => firstName + ' ' + lastName), [book])

    return (
        <Box>
            <Box mx="50px" textAlign="center">
                <Typography variant="h4">
                    {book.title}
                </Typography>
            </Box>
            <Box mt={2} textAlign="center">
                {bookAuthors.length > 0 && <Typography variant="h5">
                    By {bookAuthors.join(', ')}
                </Typography>}
            </Box>
            <Box mt={2} maxWidth={700} mx="auto" className={styles['picture-grid']}>
                <div className={styles['preview-image-container']}>
                    <img src={book.image || '/no-profile.jpg'} />
                </div>
                <div>
                    <Box ml={2}>
                        <TextDisplay text={book.desc} />
                    </Box>
                </div>
            </Box>
        </Box>
    )
}
