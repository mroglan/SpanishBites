import React, { useMemo, useState, useRef, useEffect, memo } from 'react'
import {useSprings, animated} from 'react-spring'
import styles from '../../styles/Library.module.css'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {Grid, Typography} from '@material-ui/core'

interface Item {
    type: string;
    title: string;
    onClick: () => void;
    image?:string;
}

interface Props {
    items: Item[];
}

interface PanelProps {
    i: number;
    rows: number;
    cols: number;
    panel: any[];
}

export const Panel = memo(({i, rows, cols, panel}:PanelProps) => {
    
    return (
        <>
        {Array(rows).fill('').map((_, j) => (
            <div key={j} className={styles['display-panel-row']}>
                <div>
                    <Grid container justify="space-around">
                        {panel.map((item, k) => {
                            if(k < j * cols) return
                            if((j * cols) + cols < k + 1) return
                            return <Grid key={k} item>
                                <div onClick={() => item.onClick()} className={styles['display-item']}>
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
        </>
    )
})

export default function Carousel({items}:Props) {

    const mainRef = useRef<HTMLElement>()

    const [{rows, cols}, setDimensions] = useState({rows: 0, cols: 0})
    const [disabledArrows, setDisabledArrows] = useState({left: true, right: false})
    const [panels, setPanels] = useState([])

    const origin = useRef<number>()

    useMemo(() => {
        origin.current = 0
    }, [items])

    useEffect(() => {
        setDimensions({rows: Math.floor(mainRef.current.clientHeight / 260) || 1, cols: Math.floor(mainRef.current.clientWidth / 210)})
    }, [])

    useMemo(() => {
        if(!rows || !cols) return

        const itemsPerPanel = rows * cols
        const panelsArray = items.reduce((result, item, i) => {
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

    const movePanels = (val:number) => {
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
                            <Panel i={i} rows={rows} cols={cols} panel={panel}  />
                        </animated.div>
                    ))}
                </div>
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