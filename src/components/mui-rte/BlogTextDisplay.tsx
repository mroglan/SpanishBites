import React from 'react'
import MUIRichTextEditor from 'mui-rte'
import {Box, NoSsr, ThemeProvider, createMuiTheme} from '@material-ui/core'

interface Props {
    text: string;
}

const theme = createMuiTheme()

Object.assign(theme, {
    overrides: {
        MUIRichTextEditor: {
            editorContainer: {
                fontSize: '18px',
                lineHeight: 1.5
            }
        }
    }
})

export default function BlogTextDisplay({text}:Props) {

    return (
        <ThemeProvider theme={theme}>
            <Box>
                <NoSsr>
                    <MUIRichTextEditor defaultValue={text} controls={[]} readOnly />
                </NoSsr>
            </Box>  
        </ThemeProvider>
    )
}