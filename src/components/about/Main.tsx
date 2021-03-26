import React from 'react'
import {Box} from '@material-ui/core'
import Title from './Title'
import BiteSize from './BiteSize'
import FindingBooks from './FindingBooks'
import Context from './Context'
import BookClub from './BookClub'

export default function Main() {

    return (
        <Box>
            <section>
                <Title />
            </section>
            <section>
                <BiteSize />
            </section>
            <section>
                <FindingBooks />
            </section>
            <section>
                <Context />
            </section>
            <section>
                <BookClub />
            </section>
        </Box>
    )
}