import React, {useContext, useMemo} from 'react'
import styles from '../../../../styles/Library.module.css'
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
    origin: any; // ref with ref.current = number
}

export default function PreviewCarousel({items, previewPanelAnimations, origin}:Props) {

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
                            {item.type === 'author' ? <AuthorPreview author={item} /> : 
                            item.type === 'book' ? <BookPreview book={item} /> : 
                            <PassagePreview passage={item} /> }
                        </div>
                        <div>
                            visit page
                        </div>
                    </div>
                </animated.div>
            ))}
        </div>
    )
}  