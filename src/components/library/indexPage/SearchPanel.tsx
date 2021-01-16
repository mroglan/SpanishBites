import React, {useState} from 'react'
import styles from '../../../styles/Library.module.css'
import {Grid} from '@material-ui/core'
import {PrimaryLargeSearchBar} from '../../items/searchBars'
import {BluePrimaryIconButton} from '../../items/buttons'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'

import FiltersPanel from './FiltersPanel'

export default function SearchPanel() {

    const [search, setSearch] = useState('')
    const [dropDown, setDropDown] = useState(false)

    return (
        <div className={styles['search-panel-root']}>
            <Grid container alignItems="center">
                <Grid item className={styles['searchbar-grid-item']}>
                    <PrimaryLargeSearchBar search={search} setSearch={setSearch} disabled={dropDown} />
                    {dropDown && <div className={styles['filters-dropdown-container']}>
                        <FiltersPanel />
                    </div>}
                </Grid>
                <Grid item>
                    <Grid container>
                        <Grid item>
                            <BluePrimaryIconButton disabled={dropDown} onClick={() => setDropDown(true)} >
                                <ExpandMoreOutlinedIcon />
                            </BluePrimaryIconButton>
                        </Grid>
                        <Grid item>
                            <BluePrimaryIconButton disabled={dropDown}>
                                <SettingsOutlinedIcon />
                            </BluePrimaryIconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}