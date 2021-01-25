import React from 'react'
import styles from '../../../../styles/Library.module.css'
import {animated} from 'react-spring'

interface Props {
    items: any[];
    previewPanelAnimations: any[]; // from react-spring
    origin: any; // ref with ref.current = number
}

export default function PreviewCarousel({items, previewPanelAnimations, origin}:Props) {

    return (
        <div className={styles['preview-bg']}>
            {items.map((item, i) => (
                <animated.div style={{transform: previewPanelAnimations[i].x.interpolate(x => `translateX(${x}%)`)}}
                 className={styles['panel']} key={i}>
                    {item.title}
                </animated.div>
            ))}
        </div>
    )
}  