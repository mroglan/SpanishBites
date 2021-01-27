import React, {useEffect, useRef, useState, useMemo} from 'react'
import styles from '../../../styles/Library.module.css'
import {ClientTimePeriod, ClientPassage, ClientUnpopulatedAuthor, ClientUnpopulatedBook} from '../../../database/dbInterfaces'
import {Divider, Grid, Typography} from '@material-ui/core'
import {useSprings, animated} from 'react-spring'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PreviewCarousel from './preview/PreviewCarousel'

export type DisplayItem = (ClientTimePeriod|ClientPassage|ClientUnpopulatedAuthor|ClientUnpopulatedBook) & {type:string; title:string; image?:string}

export default function DisplayPanel({items}) {

    const displayItems:DisplayItem[] = useMemo(() => {
        return items.map(item => {
            if(item.type === 'author') return {...item, title: item.firstName + ' ' + item.lastName}
            if(item.type === 'book') return {...item}
            return {...item, title: item.name}
        }).sort((a, b) => a.title.localeCompare(b.title))
    }, [items])

    const mainRef = useRef<HTMLElement>()

    const [{rows, cols}, setDimensions] = useState({rows: 0, cols: 0})
    const [disabledArrows, setDisabledArrows] = useState({left: true, right: false})
    const [panels, setPanels] = useState<DisplayItem[][]>([])
    const [viewPreview, setViewPreview] = useState(false)

    const origin = useRef<number>()
    const previewOrigin = useRef<number>()

    useMemo(() => {
        origin.current = 0
    }, [items])

    useEffect(() => {
        setDimensions({rows: Math.floor(mainRef.current.clientHeight / 260), cols: Math.floor(mainRef.current.clientWidth / 210)})
    }, [])

    useMemo(() => {
        if(!rows || !cols) return

        const itemsPerPanel = rows * cols
        const panelsArray = displayItems.reduce((result, item, i) => {
            const chunkIndex = Math.floor(i / itemsPerPanel)

            if(!result[chunkIndex]) {
                result[chunkIndex] = []
            }

            result[chunkIndex].push(item)

            return result
        }, [])

        setPanels(panelsArray)
        setDisabledArrows({left: true, right: panelsArray.length < 2})

    }, [rows, cols, items])

    const [panelAnimations, setPanelAnimations] = useSprings<any>(panels.length, i => ({x: i === 0 ? '0' : '100', config: {friction: 14 + panels[0].length}}))

    const [previewPanelAnimations, setPreviewPanelAnimations] = useSprings<any>(displayItems.length, i => {
        return {x: '0'}
    })
    
    const movePanels = (val:number) => {
        if(viewPreview) return movePreview(val)
        if(origin.current + val === -1) return
        if(origin.current + val >= panels.length) return
        origin.current += val
        setPanelAnimations(i => {
            if(i === origin.current) return {x: '0'}
            if(i > origin.current) return {x: '100'}
            return {x: '-100'}
        })
        setDisabledArrows({
            left: origin.current === 0,
            right: origin.current + 1 === panels.length
        })
    }

    const openPreview = (index:number) => {
        setPreview(index, true)
        setViewPreview(true)
    }

    const movePreview = (val:number) => {
        if(previewOrigin.current + val === -1) return
        if(previewOrigin.current + val >= displayItems.length) return
        setPreview(previewOrigin.current + val)
    }

    const setPreview = (index:number, opening?:boolean) => {
        previewOrigin.current = index
        const config = opening ? {duration: 0} : {}
        setPreviewPanelAnimations(i => {
            if(i === previewOrigin.current) return {x: '0', config}
            if(i > previewOrigin.current) return {x: '100', config}
            return {x: '-100', config}
        })
        setDisabledArrows({
            left: previewOrigin.current === 0,
            right: previewOrigin.current + 1 === displayItems.length
        })
    }

    const closePreview = () => setViewPreview(false)

    return (
        <div className={styles['display-panel-root']}>
            <aside onClick={() => movePanels(-1)} 
            className={`${styles['display-panel-side']} ${disabledArrows.left ? styles.disabled : styles.active}`}>
                <div>
                    <ArrowBackIosIcon color="secondary" />
                </div>
            </aside>
            <main ref={mainRef}>
                <div className={styles['shelf-background']}>
                    {Array(rows).fill('').map((_, i) => (
                        <div key={i} className={styles['display-panel-row']}>
                            <div />
                            <div className={styles.shelf} />
                        </div>
                    ))}
                </div>
                <div>
                    {panelAnimations && panels.map((panel, i) => (
                        <animated.div style={{transform: panelAnimations[i].x.interpolate(x => `translateX(${x}%)` )}}
                         className={`${styles['panel']}`} key={i}>
                            {Array(rows).fill('').map((_, j) => (
                                <div key={j} className={styles['display-panel-row']}>
                                    <div>
                                        <Grid container justify="space-around">
                                            {panel.map((item, k) => {
                                                if(k < j * cols) return
                                                if((j * cols) + cols < k + 1) return
                                                return <Grid key={k} item>
                                                    <div onClick={() => openPreview((i * panel.length) + k)} className={styles['display-item']}>
                                                        <img src="/library/paper.png" className={styles.paper} title="Paper"/>
                                                        <div className={styles['display-item-title']}>
                                                            <Typography variant="body1">
                                                                {item.title}
                                                            </Typography>
                                                        </div>
                                                        <div className={styles['display-item-type']}>
                                                            <Typography color="inherit" variant="body2">
                                                                {item.type.toUpperCase()}
                                                            </Typography>
                                                        </div>
                                                        {item.image && <div className={styles['display-item-img-container']}>
                                                        <img src={item.image} className={styles['display-item-image']}/>
                                                        </div>}
                                                    </div>
                                                </Grid>
                                            })}
                                        </Grid>
                                    </div>
                                    <div />
                                </div>
                            ))}
                        </animated.div>
                    ))}
                </div>
                {viewPreview && <PreviewCarousel items={displayItems} previewPanelAnimations={previewPanelAnimations} closePreview={closePreview} />}
            </main>
            <aside onClick={() => movePanels(1)} 
            className={`${styles['display-panel-side']} ${disabledArrows.right ? styles.disabled : styles.active}`}>
                <div>
                    <ArrowForwardIosIcon color="secondary" />
                </div>
            </aside>
        </div>
    )
}