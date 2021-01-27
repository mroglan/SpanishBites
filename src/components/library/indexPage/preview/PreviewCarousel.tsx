import React, {useContext, useMemo} from 'react'
import Link from 'next/link'
import styles from '../../../../styles/Library.module.css'
import {Grid} from '@material-ui/core'
import {BlueDenseButton, BluePrimaryIconButton} from '../../../items/buttons'
import CloseIcon from '@material-ui/icons/Close';
import LaunchIcon from '@material-ui/icons/Launch';
import {ClientUnpopulatedAuthor} from '../../../../database/dbInterfaces'
import {animated} from 'react-spring'
import {DisplayItem} from '../DisplayPanel'
import {LibraryItemsContext} from '../Main'

import AuthorPreview from './AuthorPreview'
import BookPreview from './BookPreview'
import PassagePreview from './PassagePreview'

interface Props {
    items: any[];
    previewPanelAnimations: any[]; // from react-spring
    closePreview: () => void;
}

export default function PreviewCarousel({items, previewPanelAnimations, closePreview}:Props) {

    const libraryItems = useContext(LibraryItemsContext)

    const updatedItems = useMemo(() => items.map(item => {
        if(item.type === 'author') return item
        if(item.type === 'book') return {...item, authors: item.authors.map(author => {
            return libraryItems.authors.find(a => a._id === author)
        })}
        return {...item, book: {...item.book, authors: item.book.authors.map(author => {
            return libraryItems.authors.find(a => a._id === author)
        })}}
    }), [items])

    return (
        <div className={styles['preview-bg']}>
            {updatedItems.map((item:any, i) => (
                <animated.div style={{transform: previewPanelAnimations[i].x.interpolate(x => `translateX(${x}%)`)}}
                 className={styles['preview-panel']} key={i}>
                    <div className={styles['preview-root']}>
                        <div className={styles['preview-content']}>
                            <div className={styles['preview-visit-container']}>
                                <Link href={`/library/${item.type}s/[id]`} as={`/library/${item.type}s/${item._id}`}>
                                    <a>
                                        <BluePrimaryIconButton>
                                            <LaunchIcon />
                                        </BluePrimaryIconButton>
                                    </a>
                                </Link>
                            </div>
                            {item.type === 'author' ? <AuthorPreview author={item} /> : 
                            item.type === 'book' ? <BookPreview book={item} /> : 
                            <PassagePreview passage={item} /> }
                            <div className={styles['preview-close-container']}>
                                <BluePrimaryIconButton onClick={() => closePreview()} >
                                    <CloseIcon />
                                </BluePrimaryIconButton>
                            </div>
                        </div>
                        <div>
                            <Grid container justify="center">
                                <Grid item>
                                    <Link href={`/library/${item.type}s/[id]`} as={`/library/${item.type}s/${item._id}`}>
                                        <a>
                                            <BlueDenseButton>
                                                Visit Page
                                            </BlueDenseButton>
                                        </a>
                                    </Link>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}  