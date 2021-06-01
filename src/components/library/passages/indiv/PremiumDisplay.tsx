import React from 'react'
import styles from '../../../../styles/Resource.module.css'
import {Paper, Box, Typography} from '@material-ui/core'
import TextDisplay from '../../../mui-rte/TextDisplay'

interface Props {
    info: {
        annotations:string;
        commentary:string;
    }
}

export default function PremiumDisplay({info}:Props) {

    if(!info) return <div />

    return (
        <>
            <div style={{width: 'clamp(300px, 100%, 90ch)', minHeight: 500}}>
                <iframe src={info.annotations} style={{height: '100%', width: '100%'}}></iframe>
            </div>
            <div className={styles['detailed-info']}>
                    <Paper elevation={3}>
                        <Box px={3} py={3}>
                            <Box className={styles['title-container']} mb={2} ml={2}>
                                <Typography variant="h4">
                                    Commentary
                                </Typography>
                            </Box>
                            <Box ml={2} maxWidth={600}>
                                <TextDisplay text={info.commentary} />
                            </Box>
                        </Box>
                    </Paper>
                </div>
        </>
    )
}