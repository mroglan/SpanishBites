import React, {SetStateAction, Dispatch} from 'react'
import Link from 'next/link'
import styles from '../../../styles/Library.module.css'
import {SideBarBluePrimaryButton, SideBarGoldPrimaryButton} from '../../items/buttons'
import {Typography} from '@material-ui/core'
import {Filters, initialFilters} from './FiltersPanel'

interface Props {
    setFilters: Dispatch<SetStateAction<Filters>>;
    filters: Filters;
    closePopup?: () => void;
    signedIn: boolean;
}

export default function SideBar({setFilters, closePopup, filters, signedIn}:Props) {

    const changeFilters = (libraryItem:string) => {
        if(Boolean(closePopup)) closePopup()
        setFilters({...initialFilters, bite: false, favorites: filters.favorites, libraryItem})
    }

    const openBite = () => {
        if(Boolean(closePopup)) closePopup()
        setFilters({...initialFilters, favorites: false, bite: true})
    }

    const openFavorites = () => {
        if(Boolean(closePopup)) closePopup()
        setFilters({...filters, favorites: true, bite: false})
    }

    return (
        <div>
            <ul>
                <li>
                    <SideBarBluePrimaryButton data-testid="sidebar-bite" onClick={() => openBite()}>
                        <Typography variant="body1">
                            Today's Bite
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                {signedIn && <li>
                    <SideBarGoldPrimaryButton data-testid="sidebar-favorites" onClick={() => openFavorites()}>
                        <Typography variant="body1">
                            Favorites
                        </Typography>
                    </SideBarGoldPrimaryButton>
                </li>}
                <li>
                    <SideBarBluePrimaryButton data-testid="sidebar-authors" onClick={() => changeFilters('authors')}>
                        <Typography variant="body1">
                            Authors
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <SideBarBluePrimaryButton data-testid="sidebar-books" onClick={() => changeFilters('books')}>
                        <Typography variant="body1">
                            Books
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <SideBarBluePrimaryButton data-testid="sidebar-passages" onClick={() => changeFilters('passages')}>
                        <Typography variant="body1">
                            Passages
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <Link href="/library/timeperiods" >
                        <a>
                            <SideBarBluePrimaryButton>
                                <Typography variant="body1">
                                    Time Periods
                                </Typography>
                            </SideBarBluePrimaryButton>
                        </a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}