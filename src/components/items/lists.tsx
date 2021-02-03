import React from 'react'
import {makeStyles} from '@material-ui/core/styles'

const useBulletListStyles = makeStyles(theme => ({
    root: {
        '& li': {
            paddingBottom: theme.spacing(1)
        }
    }
}))

export function BulletList({children}) {

    const classes = useBulletListStyles()
    return (
        <ul className={classes.root}>
            {children}
        </ul>
    )
}