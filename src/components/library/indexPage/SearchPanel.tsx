import React, {useState, useMemo, useContext, useEffect} from 'react'
import styles from '../../../styles/Library.module.css'
import {Grid, ClickAwayListener} from '@material-ui/core'
import {PrimaryLargeSearchBar} from '../../items/searchBars'
import {BluePrimaryIconButton} from '../../items/buttons'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import FiltersPanel, {initialFilters, Filters} from './FiltersPanel'

interface Props {
    filters: Filters;
    setFilters: (value:Filters) => void;
    search: string;
    setSearch: (value:string) => void;
}

export default function SearchPanel({filters, setFilters, search, setSearch}:Props) {

    const [dropDown, setDropDown] = useState({open: false, updateFilters: false, updateSearch: false})

    const [newFilters, setNewFilters] = useState<Filters>(initialFilters)
    const [newSearch, setNewSearch] = useState('')

    const closeFilters = () => setDropDown({open: false, updateFilters: false, updateSearch: false})

    const saveNewFilters = (inputFilters:Filters) => {
        setDropDown({open: false, updateFilters: true, updateSearch: false})
        setNewFilters(inputFilters)
    }

    const updateSearch = (input:string) => {
        setDropDown({open: false, updateFilters: false, updateSearch: true})
        setNewSearch(input)
    }

    useEffect(() => {
        if(dropDown.updateFilters) setFilters(newFilters)
        if(dropDown.updateSearch) setSearch(newSearch)
    }, [dropDown])

    return (
        <div className={styles['search-panel-root']}>
            <Grid style={{position: 'relative'}} container alignItems="center">
                <Grid item className={styles['searchbar-grid-item']}>
                    <PrimaryLargeSearchBar search={search} setSearch={updateSearch} disabled={dropDown.open} />
                </Grid>
                <Grid item className={styles['search-panel-options-item']}>
                    <Grid container>
                        <Grid item>
                            <BluePrimaryIconButton data-testid="filters-dropdown-btn" disabled={dropDown.open} 
                            onClick={() => setDropDown({open: true, updateFilters: false, updateSearch: false})} >
                                <ExpandMoreOutlinedIcon />
                            </BluePrimaryIconButton>
                        </Grid>
                        <Grid item>
                            <BluePrimaryIconButton disabled={dropDown.open}>
                                <SettingsOutlinedIcon />
                            </BluePrimaryIconButton>
                        </Grid>
                    </Grid>
                </Grid>
                {dropDown.open && <div data-testid="filterspanel-container" className={styles['filters-dropdown-container']}>
                    <FiltersPanel filters={filters} setFilters={saveNewFilters} closeFilters={closeFilters} />
                </div>}
            </Grid>
        </div>
    )
}