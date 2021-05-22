import React, {useState, MouseEvent, SetStateAction, Dispatch} from 'react'
import {Grid, Box, Popper, ClickAwayListener, Backdrop, Paper} from '@material-ui/core'
import styles from '../../../styles/Library.module.css'
import {BluePrimaryIconButton, BlueDenseButton} from '../../items/buttons'
import FilterListIcon from '@material-ui/icons/FilterList';
import CategoryIcon from '@material-ui/icons/Category';
import SideBar from './SideBar'
import { Filters } from './FiltersPanel';

interface Props {
    filters: Filters;
    setFilters: Dispatch<SetStateAction<Filters>>;
    signedIn: boolean;
}

export default function PopoutSidebar({setFilters, filters, signedIn}:Props) {

    const [anchorEl, setAnchorEl] = useState(null)

    const btnClick = (e:MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(anchorEl ? null : e.currentTarget)
    }

    const handleClose = () => setAnchorEl(null)

    return (
        <Box>
            <Grid container justify="center">
                <Grid item>
                    <BlueDenseButton startIcon={<CategoryIcon />}
                    onClick={btnClick} >
                        Category
                    </BlueDenseButton>
                </Grid>
            </Grid>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} role="nav" transition style={{zIndex: 501}} placement="top">
                <Paper elevation={3} className={`${styles['sidebar']} ${styles['popup']}`}>
                    <ClickAwayListener onClickAway={handleClose}>
                        <div>
                            <SideBar signedIn={signedIn} setFilters={setFilters} filters={filters} closePopup={handleClose} />    
                        </div> 
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </Box>
    )
}