import React, {useMemo} from 'react'
import {ClientPassage, ClientUnpopulatedAuthor} from '../../../../database/dbInterfaces'
import {Box, Typography} from '@material-ui/core'
import styles from '../../../../styles/Library.module.css'
import TextDisplay from '../../../mui-rte/TextDisplay'

interface PreviewPassage extends Omit<ClientPassage, 'book'> {
    book: {
        _id: string;
        title: string;
        genres: string[];
        timePeriod: string;
        authors: ClientUnpopulatedAuthor[];
    }
}

interface Props {
    passage: PreviewPassage;
}

export default function PreviewPassage({passage}:Props) {

    const authors = useMemo(() => passage.book.authors.map(({firstName, lastName}) => firstName + ' ' + lastName), [passage])

    return (
        <Box>
            <Box mx="50px" textAlign="center">
                <Typography variant="h4">
                    {passage.name}
                </Typography>
            </Box>
            <Box textAlign="center" mt={2}>
                <Typography variant="h5">
                    From <i>{passage.book.title}</i>
                </Typography>
                <Typography variant="h5">
                    by {authors.join(', ')}
                </Typography>
            </Box>
            <Box mx="auto" maxWidth="90ch" mt={3}>
                <TextDisplay text={passage.spanishText} />
            </Box>
        </Box>
    )
}
