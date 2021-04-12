import React from 'react'
import {FormControl, OutlinedInput, InputAdornment, IconButton} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import CloseIcon from '@material-ui/icons/Close'
import {SetStateAction, Dispatch, useState, useRef, KeyboardEvent} from 'react'

interface PrimarySearchBarProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

interface PrimaryLargeSearchBarProps extends PrimarySearchBarProps {
    disabled?: boolean;
}

interface SearchBarProps extends PrimaryLargeSearchBarProps {
    type: string;
}

const usePrimaryStyles = makeStyles(theme => ({
    button: {
        '&:hover': {
            color: theme.palette.primary.main
        }
    }
}))

export function SearchBar({search, setSearch, type, disabled}:SearchBarProps) {

    const [input, setInput] = useState(search)

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
        <FormControl style={{width: type === 'dense' ? 'auto' : '100%'}} variant="outlined">
            <OutlinedInput id="search-bar" placeholder="Search..." onKeyPress={handleKeyPress} onBlur={handleBlur}
            value={input} onChange={(e) => setInput(e.target.value as string)} margin={type === 'dense' ? 'dense' : 'none'} 
            inputProps={{'data-testid': 'searchInput'}}
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

export function PrimarySearchBar({search, setSearch}:PrimarySearchBarProps) {

    return <SearchBar search={search} setSearch={setSearch} type="dense" />
}

export function PrimaryLargeSearchBar({search, setSearch, disabled}:PrimaryLargeSearchBarProps) {

    return <SearchBar search={search} setSearch={setSearch} type="large" />
}