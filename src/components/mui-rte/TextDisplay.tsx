import React from 'react'
import MUIRichTextEditor from 'mui-rte'
import {Box, NoSsr} from '@material-ui/core'

interface Props {
    text: string;
}

export default function TextDisplay({text}:Props) {

    return (
        <Box>
            <NoSsr>
                <MUIRichTextEditor defaultValue={text} controls={[]} readOnly />
            </NoSsr>
        </Box>
    )
}