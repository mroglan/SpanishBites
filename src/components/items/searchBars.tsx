import React from 'react'
import {FormControl, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import {SetStateAction, Dispatch, useState, useRef, KeyboardEvent} from 'react'

interface Props {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    disabled?:boolean;
}

const usePrimaryStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}))

export function PrimarySearchBar({search, setSearch}:Props) {

    const [input, setInput] = useState('')

    const searchRef = useRef<HTMLButtonElement>()

    const handleKeyPress = (e:KeyboardEvent) => {
        if(e.key === 'Enter') searchRef.current.click()
    }

    const handleBlur = () => {
        if(input) return
        if(!search) return
        setSearch('')
    }

    const classes = usePrimaryStyles()

    return (
        <FormControl variant="outlined">
            <OutlinedInput id="search-bar" placeholder="Search..." onKeyPress={handleKeyPress} onBlur={handleBlur}
            value={input} onChange={(e) => setInput(e.target.value as string)} margin="dense" inputProps={{'data-testid': 'searchInput'}}
            startAdornment={
                <InputAdornment position="start">
                    <IconButton aria-label="Search" data-testid="searchBtn" className={classes.button} onClick={() => setSearch(input)} 
                    edge="start" ref={searchRef}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            } endAdornment={
                Boolean(input) && <InputAdornment position="end">
                    <IconButton aria-label="Clear Search" data-testid="clearBtn" className={classes.button} onClick={() => {
                        setInput('')
                        setSearch('')
                    }} edge="end">
                        <CloseIcon />
                    </IconButton>
                </InputAdornment>
            } />
        </FormControl>
    )
}

export function PrimaryLargeSearchBar({search, setSearch, disabled}:Props) {

    const [input, setInput] = useState('')

    const searchRef = useRef<HTMLButtonElement>()

    const handleKeyPress = (e:KeyboardEvent) => {
        if(e.key === 'Enter') searchRef.current.click()
    }

    const handleBlur = () => {
        if(input) return
        if(!search) return
        setSearch('')
    }

    const classes = usePrimaryStyles()

    return (
        <FormControl style={{width: '100%'}} variant="outlined">
            <OutlinedInput id="search-bar" placeholder="Search..." onKeyPress={handleKeyPress} onBlur={handleBlur} fullWidth
            value={input} onChange={(e) => setInput(e.target.value as string)} inputProps={{'data-testid': 'searchInput'}}
            startAdornment={
                <InputAdornment position="start">
                    <IconButton aria-label="Search" data-testid="searchBtn" className={classes.button} onClick={() => setSearch(input)} 
                    edge="start" ref={searchRef}>
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>
            } endAdornment={
                Boolean(input) && <InputAdornment position="end">
                    <IconButton aria-label="Clear Search" data-testid="clearBtn" className={classes.button} onClick={() => {
                        setInput('')
                        setSearch('')
                    }} edge="end">
                        <CloseIcon />
                    </IconButton>
                </InputAdornment>
            } disabled={disabled} />
        </FormControl>
    )
}