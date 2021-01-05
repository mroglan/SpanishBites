import React from 'react'
import MUIRichTextEditor from 'mui-rte'
import {Box} from '@material-ui/core'
import {useState, useEffect} from 'react'

interface Props {
    text: string;
}

export default function TextDisplay({text}:Props) {

    const [clientSide, setClientSide] = useState(false)

    useEffect(() => setClientSide(true), [])

    return (
        <Box>
            {clientSide && <MUIRichTextEditor defaultValue={text} controls={[]} readOnly /> }
        </Box>
    )
}