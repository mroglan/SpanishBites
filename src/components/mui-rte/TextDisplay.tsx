import React from 'react'
import MUIRichTextEditor from 'mui-rte'
import {Box, createMuiTheme, NoSsr, ThemeProvider} from '@material-ui/core'

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

const bookDescTheme = createMuiTheme()

Object.assign(bookDescTheme, {
    overrides: {
        MUIRichTextEditor: {
            editorContainer: {
                fontSize: '20px',
                lineHeight: 2
            }
        }
    }
})

export function BookDescTextDisplay({text}:Props) {

    return (
        <ThemeProvider theme={bookDescTheme}>
            <Box>
                <NoSsr>
                    <MUIRichTextEditor defaultValue={text} controls={[]} readOnly />
                </NoSsr>
            </Box>
        </ThemeProvider>
    )
}