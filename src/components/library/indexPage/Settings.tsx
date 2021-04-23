import React, {Dispatch, SetStateAction, useState, MouseEvent, useMemo} from 'react'
import styles from '../../../styles/Library.module.css'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import {BluePrimaryIconButton} from '../../items/buttons'
import {Popper, Paper, ClickAwayListener, MenuItem, Grid, Typography, Radio} from '@material-ui/core'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

export interface Settings {
    viewMode: string;
    transitions: boolean;
}

interface Props {
    disabled: boolean;
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
}

interface SpecificSettings {
    settings: Settings;
    setSettings: Dispatch<SetStateAction<Settings>>;
    mainAnchorEl: null | HTMLElement;
}

export function ViewModeSettings({settings, setSettings, mainAnchorEl}:SpecificSettings) {

    const [viewModeAnchor, setViewModeAnchor] = useState(null)

    const handleViewModeClick = (e:MouseEvent) => {
        setViewModeAnchor(viewModeAnchor ? null : e.currentTarget)
    }
    const handleViewModeClose = () => setViewModeAnchor(null)

    useMemo(() => !Boolean(mainAnchorEl) && Boolean(viewModeAnchor) ? setViewModeAnchor(null) : '', [mainAnchorEl])

    const changeViewMode = (mode:string) => {
        if(mode === settings.viewMode) return
        setSettings({...settings, viewMode: mode})
    }

    return (
        <>
            <MenuItem onClick={(e) => handleViewModeClick(e)} 
            className={`${styles['settings-menuitem']} ${viewModeAnchor ? styles['selected'] : ''}`}>
                <Grid container alignItems="center" justify="space-between" spacing={3} wrap="nowrap">
                    <Grid container alignItems="center" item>
                        <ArrowLeftIcon />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            View Mode
                        </Typography>
                    </Grid>
                </Grid>
            </MenuItem>
            <Popper style={{zIndex: 50}} open={Boolean(viewModeAnchor)} anchorEl={viewModeAnchor} transition placement="left-start">
                <Paper elevation={1}>
                    <ClickAwayListener onClickAway={handleViewModeClose}>
                        <div>
                            <MenuItem onClick={() => changeViewMode('carousel')} className={styles['settings-option']}>
                                <Grid container alignItems="center" spacing={1} wrap="nowrap">
                                    <Grid container alignItems="center" style={{width: 32}} item>
                                        <Radio checked={settings.viewMode === 'carousel'} color="secondary" style={{padding: 0}} />
                                    </Grid> 
                                    <Grid item>
                                        <Typography variant="body1">
                                            Carousel
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                            <MenuItem onClick={() => changeViewMode('list')} className={styles['settings-option']}>
                                <Grid container alignItems="center" spacing={1} wrap="nowrap">
                                    <Grid container alignItems="center" style={{width: 32}} item>
                                        <Radio checked={settings.viewMode === 'list'} color="secondary" style={{padding: 0}} />
                                    </Grid> 
                                    <Grid item>
                                        <Typography variant="body1">
                                            List
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        </div>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    )
}

export function TransitionsSettings({settings, setSettings, mainAnchorEl}:SpecificSettings) {

    const [transitionAnchor, setTransitionAnchor] = useState(null)

    const handleTransitionsClick = (e:MouseEvent) => {
        setTransitionAnchor(transitionAnchor ? null : e.currentTarget)
    }
    const handleTransitionsClose = () => setTransitionAnchor(null)

    useMemo(() => !Boolean(mainAnchorEl) && Boolean(transitionAnchor) ? setTransitionAnchor(null) : '', [mainAnchorEl])

    const changeTransition = (on:boolean) => {
        if(on === settings.transitions) return
        setSettings({...settings, transitions: on})
    }

    return (
        <>
            <MenuItem onClick={(e) => handleTransitionsClick(e)} 
            className={`${styles['settings-menuitem']} ${transitionAnchor ? styles['selected'] : ''}`}>
                <Grid container alignItems="center" justify="space-between" spacing={3} wrap="nowrap">
                    <Grid container alignItems="center" item>
                        <ArrowLeftIcon />
                    </Grid>
                    <Grid item>
                        <Typography variant="body1">
                            Transitions
                        </Typography>
                    </Grid>
                </Grid>
            </MenuItem>
            <Popper style={{zIndex: 50}} open={Boolean(transitionAnchor)} anchorEl={transitionAnchor} transition placement="left-start">
                <Paper elevation={1}>
                    <ClickAwayListener onClickAway={handleTransitionsClose}>
                        <div>
                            <MenuItem onClick={() => changeTransition(true)} className={styles['settings-option']}>
                                <Grid container alignItems="center" spacing={1} wrap="nowrap">
                                    <Grid container alignItems="center" style={{width: 32}} item>
                                        <Radio checked={settings.transitions} color="secondary" style={{padding: 0}} />
                                    </Grid> 
                                    <Grid item>
                                        <Typography variant="body1">
                                            On
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                            <MenuItem onClick={() => changeTransition(false)} className={styles['settings-option']}>
                                <Grid container alignItems="center" spacing={1} wrap="nowrap">
                                    <Grid container alignItems="center" style={{width: 32}} item>
                                        <Radio checked={!settings.transitions} color="secondary" style={{padding: 0}} />
                                    </Grid> 
                                    <Grid item>
                                        <Typography variant="body1">
                                            Off
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </MenuItem>
                        </div>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    )
}

export default function SettingsDisplay({disabled, settings:initialSettings, setSettings:resetSettings}:Props) {

    const [anchorEl, setAnchorEl] = useState(null)

    const [settings, setSettings] = useState(initialSettings)

    const handleIconClick = (e:MouseEvent<HTMLButtonElement>) => {
        if(anchorEl) resetSettings(settings)
        setAnchorEl(anchorEl ? null : e.currentTarget)
    }
    const handleClose = () => {
        if(JSON.stringify(settings) !== JSON.stringify(initialSettings)) resetSettings(settings)
        setAnchorEl(null)
    }

    return (
        <>
            <BluePrimaryIconButton onClick={(e) => handleIconClick(e)} disabled={disabled}>
                <SettingsOutlinedIcon />
            </BluePrimaryIconButton>
            <Popper style={{zIndex: 50}} open={Boolean(anchorEl)} anchorEl={anchorEl} transition placement="bottom-end">
                <Paper elevation={3}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div>
                            <ViewModeSettings settings={settings} setSettings={setSettings} mainAnchorEl={anchorEl} />
                            <TransitionsSettings settings={settings} setSettings={setSettings} mainAnchorEl={anchorEl} />
                        </div>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </>
    )
}