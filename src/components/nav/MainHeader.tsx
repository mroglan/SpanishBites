import {Box, Typography, Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    title: {
        color: theme.palette.primary.main,
        fontWeight: 500
    },
    backdrop: {
        background: 'hsl(50, 100%, 80%)',
    }
}))

export default function Header() {

    const classes = useStyles()
    return (
        <Box>
            <Box py={1} px={3} textAlign="center" className={classes.backdrop}>
                <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                        <Grid container wrap="nowrap" spacing={1} alignItems="center">
                            <Grid item>
                                <img src="/logo2.svg" title="Spanish Bites" style={{width: 40, height: 40}} />
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