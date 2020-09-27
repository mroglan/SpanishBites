import {Typography} from '@material-ui/core'
import {withStyles} from '@material-ui/core/styles'

export const PrimaryLink = withStyles(theme => ({
    root: {
        color: theme.palette.primary.main,
        textDecorationColor: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        },
        display: 'inline'
    }
}))(Typography)

export const SecondaryLink = withStyles(theme => ({
    root: {
        color: theme.palette.secondary.main,
        textDecorationColor: theme.palette.secondary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        },
        display: 'inline'
    }
}))(Typography)