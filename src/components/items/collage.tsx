import React from 'react'
import styles from '../../styles/Collage.module.css'
import {Tooltip} from '@material-ui/core'
import Link from 'next/link'

interface CollageProps {
    images: {url: string; linkAs: string; linkHref: string;}[];
    labels?: string[];
}

export const SmallCollage = ({images, labels}:CollageProps) => {

    return (
        <div className={styles['small-root']}>
            {images.map((image, i) => (
                <div key={i}>
                    <Link href={image.linkHref} as={image.linkAs}>
                        <a>
                            {!labels ? <img data-testid="smallCollageImage" src={image.url || '/no-profile.jpg'} /> : <Tooltip title={labels[i]}>
                                <img data-testid="smallCollageImage" src={image.url || '/no-profile.jpg'} />
                            </Tooltip>}
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    )
}