import React, {memo} from 'react'
import Link from 'next/link'
import styles from '../../../../styles/Library.module.css'
import {Grid, Box} from '@material-ui/core'
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
    item: any;
    closePreview: () => void;
}

export default memo(function PreviewCarousel({item, closePreview}:Props) {

    return (
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
                <Box mb={1}>
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
                </Box>
            </div>
        </div>
    )
})