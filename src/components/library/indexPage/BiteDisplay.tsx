import React, {useContext} from 'react'
import styles from '../../../styles/Library.module.css'
import {LibraryItemsContext} from './Main'
import {Box, Paper, Typography, Grid, Divider} from '@material-ui/core'
import TextDisplay from '../../mui-rte/TextDisplay'
import {BlueDenseButton} from '../../items/buttons'
import BiteCard from '../bites/BiteCard'

interface Props {
    hideBite: () => void;
}

export default function BiteDisplay({hideBite}:Props) {

    const {bite} = useContext(LibraryItemsContext)

    return (
        <div className={styles['bite-display-root']}>
            <Box maxWidth={800}>
                {bite && <BiteCard bite={bite} />}
                <Box mt={3}>
                    <Grid container justify="center">
                        <BlueDenseButton data-testid="bite-display-return-home-btn" onClick={() => hideBite()}>
                            Return Home
                        </BlueDenseButton>
                    </Grid>
                </Box>
            </Box>
        </div>
    )
}