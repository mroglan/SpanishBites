import React, { useContext, useMemo } from 'react'
import styles from '../../../styles/Library.module.css'
import {Box} from '@material-ui/core'
import {LibraryItemsContext} from './Main'
import {getListItemInfo} from '../../../utils/library'
import ListItem from '../basic/ListItem'

export default function ListDisplay({items}) {

    const libraryItems = useContext(LibraryItemsContext)

    const listItems = useMemo(() => {
        return getListItemInfo(items, libraryItems.authors)
    }, [items])

    return (
        <div className={styles['list-display-root']}>
            <Box className={styles['list-display-items-container']}>
                {listItems.map((item, i) => (
                    <Box maxWidth={300} key={i}>
                        <ListItem title={item.title} subtitle={item.subtitle} image={item.image} link={item.link} />
                    </Box>
                ))}
            </Box>
        </div>
    )
}