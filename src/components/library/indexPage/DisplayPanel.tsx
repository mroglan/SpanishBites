import React, {useEffect, useRef, useState, useMemo} from 'react'
import styles from '../../../styles/Library.module.css'
import {Grid} from '@material-ui/core'
import {useSprings, animated} from 'react-spring'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export default function DisplayPanel({items}) {

    const mainRef = useRef<HTMLElement>()

    const [{rows, cols}, setDimensions] = useState({rows: 0, cols: 0})
    const [disabledArrows, setDisabledArrows] = useState({left: true, right: false})
    const [panels, setPanels] = useState([])

    const origin = useRef<number>()
    const move = useRef<string>()

    useMemo(() => {
        origin.current = 0
        move.current = 'none'
    }, [items])

    useEffect(() => {
        setDimensions({rows: Math.floor(mainRef.current.clientHeight / 260), cols: Math.floor(mainRef.current.clientWidth / 210)})
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
        move.current = val < 0 ? 'right' : 'left'
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
                            {Array(rows).fill('').map((_, j) => (
                                <div key={j} className={styles['display-panel-row']}>
                                    <div>
                                        <Grid container justify="space-around">
                                            {panel.map((item, k) => {
                                                if(k < j * cols) return
                                                if((j * cols) + cols < k + 1) return
                                                return <Grid key={k} item>
                                                    <img src="/library/paper.png" className={styles.paper} title="Paper" />
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