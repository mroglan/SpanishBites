import React, { useMemo, useState, useRef, useEffect, memo } from 'react'
import {useSprings, animated, interpolate} from 'react-spring'
import styles from '../../styles/Carousels.module.css'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {BluePrimaryIconButton} from '../items/buttons'

interface BasicImageCarouselProps {
    width?: number;
    height?: number;
    images: {src:string;link:string}[];
}

export function BasicImageCarousel({images, width, height}:BasicImageCarouselProps) {

    const origin = useRef<number>()

    const clicked = useRef<boolean>()

    const autoMove = () => {
        if(clicked.current) return
        movePanels(1, true)
        setTimeout(() => autoMove(), 5000)
    }

    useMemo(() => origin.current = 0, [images])

    useEffect(() => {
        setTimeout(() => autoMove(), 5000)
    }, [])

    const [panelAnimations, setPanelAnimations] = useSprings<any>(images.length, i => ({transform: i === 0 ? 'translateX(0%)' : 'translateX(100%)'}))

    const calcNewIndex = (num:number) => {
        let newIndex:number;
        if(Math.abs(num) >= Math.abs(images.length)) { 
            newIndex = (Math.abs(num) % Math.abs(images.length))
            if(num < 0) {
                newIndex = newIndex === 0 ? newIndex : images.length - Math.abs(newIndex) 
            }
        } else {
            newIndex = num
            if(num < 0) {
                newIndex = images.length - Math.abs(newIndex)
            }
        }

        return newIndex
    }

    const movePanels = (change:number, auto?:boolean) => {
        origin.current += change

        const adjustedIndex = calcNewIndex(origin.current)
        const previousIndex = calcNewIndex(origin.current - change)

        if(!clicked.current && !auto) clicked.current = true
        
        setPanelAnimations(i => {
            if(change === -1 && i === adjustedIndex) {
                return {to: [{transform: 'translateX(-100%)', config: {duration: 0}}, {transform: 'translateX(0%)', config: {duration: undefined}}]}
            }
            if(change === 1 && i === adjustedIndex) {
                return {to: [{transform: 'translateX(100%)', config: {duration: 0}}, {transform: 'translateX(0%)', config: {duration: undefined}}]}
            }
            if(change === -1 && i === previousIndex) {
                return {to: [{transform: 'translateX(0%)', config: {duration: 0}}, {transform: 'translateX(100%)', config: {duration: undefined}}]}
            }
            if(change === 1 && i === previousIndex) {
                return {to: [{transform: 'translateX(0%)', config: {duration: 0}}, {transform: 'translateX(-100%)', config: {duration: undefined}}]}
            }
        })
    }

    return (
        <div style={{width, height}} className={styles['carousel-root']}>
            <div className={`${styles['simple-btn']} ${styles['left']}`}>
                <BluePrimaryIconButton onClick={() => movePanels(-1)}>
                    <ChevronLeftIcon fontSize="large" />
                </BluePrimaryIconButton>
            </div>
            <div style={{height: '100%'}}>
                {panelAnimations && images.map((image, i) => (
                    <animated.div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', ...panelAnimations[i] }} key={i}>
                        <a href={image.link} target="_blank">
                            <img src={image.src} style={{width, height}} />
                        </a>
                    </animated.div> 
                ))}
            </div>
            <div className={`${styles['simple-btn']} ${styles.right}`}>
                <BluePrimaryIconButton onClick={() => movePanels(1)}>
                    <ChevronRightIcon fontSize="large" />
                </BluePrimaryIconButton>
            </div>
        </div>
    )
}