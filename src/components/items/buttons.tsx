import {withStyles} from '@material-ui/core/styles'
import {Button, IconButton} from '@material-ui/core'

export const BluePrimaryButton = withStyles(theme => ({
    root: {
        background: theme.palette.primary.main,
        color: '#fff', 
        borderRadius: theme.spacing(3),
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        transition: 'background 300ms', 
        '&:hover': {
            background: theme.palette.primary.dark
        }
    }
}))(Button)

export const RedPrimaryButton = withStyles(theme => ({
    root: {
        background: theme.palette.secondary.main,
        color: '#fff',
        borderRadius: theme.spacing(3),
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        transition: 'background 300ms',
        '&:hover': {
            background: theme.palette.secondary.dark
        }
    }
}))(Button)

export const BlueSecondaryButton = withStyles(theme => ({
    root: {
        background: 'transparent',
        border: `2px solid #000`,
        borderRadius: theme.spacing(3),
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        transition: 'background color border 300ms',
        '&:hover': {
            color: '#fff',
            background: theme.palette.primary.dark,
            borderColor: theme.palette.primary.dark
        }
    }
}))(Button)

export const RedSecondaryButton = withStyles(theme => ({
    root: {
        background: 'transparent',
        border: `2px solid #000`,
        borderRadius: theme.spacing(3),
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
        //color: 'hsl(359, 80%, 50%)',
        transition: 'background color border 300ms',
        '&:hover': {
            color: '#fff',
            background: theme.palette.secondary.dark,
            borderColor: theme.palette.secondary.dark
        }
    }
}))(Button)


export const SideBarBluePrimaryButton = withStyles(theme => ({
    root: {
        background: 'hsla(229, 100%, 81%, .2)',
        borderRadius: '10px',
        width: '100%',
        color: theme.palette.primary.main,
        padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
        transition: 'color background 300ms',
        '&:hover': {
            color: theme.palette.primary.main,
            background: 'hsla(229, 100%, 81%, .3)'
        }
    }
}))(Button)


export const BluePrimaryIconButton = withStyles(theme => ({
    root: {
        color: theme.palette.primary.main
    }
}))(IconButton)


export const GrayDenseButton = withStyles(theme => ({
    root: {
        background: 'hsla(229, 23%, 78%, .8)',
        color: '#000',
        borderRadius: theme.spacing(1),
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        transition: 'background 300ms',
        '&:hover': {
            background: 'hsla(229, 23%, 78%, 1)'
        }
    }
}))(Button)

export const BlueDenseButton = withStyles(theme => ({
    root: {
        background: theme.palette.primary.main,
        color: '#fff',
        borderRadius: theme.spacing(1),
        padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
        transition: 'background 300ms',
        '&:hover': {
            background: theme.palette.primary.dark
        }
    }
}))(Button)