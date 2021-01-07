import React from 'react'
import {Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

interface Props {
    bg: string;
}

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        fontFamily: 'Catamaran !important'
    },
}))

export default function Header({bg}:Props) {

    const classes = useStyles()
    return (
        <Box>
            <Box py={1} px={3} textAlign="center" style={{background: bg}}>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Grid container wrap="nowrap" spacing={1} alignItems="center">
                            <Grid item>
                                <img src={bg === "#fff" || bg === "none" ? '/logo.svg' : '/logo2.svg'} title="Spanish Bites" style={{width: 40, height: 40}} />
                            </Grid>
                            <Grid item>
                                <Typography className={classes.title} variant="h4" component="h1">
                                    Spanish Bites
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}