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
                        <Grid container spacing={1} alignItems="center">
                            <Grid item>
                                <Box width={40} height={40} border="1px solid hsl(229, 100%, 58%)" display="flex" 
                                justifyContent="center" alignItems="center" padding={2} borderRadius="50%">
                                    <Typography color="primary">Logo</Typography>
                                </Box>
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