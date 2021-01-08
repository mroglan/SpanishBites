import React from 'react'
import styles from '../../../styles/Library.module.css'
import {SideBarBluePrimaryButton} from '../../items/buttons'
import {Typography} from '@material-ui/core'

export default function SideBar() {

    return (
        <div>
            <ul>
                <li>
                    <SideBarBluePrimaryButton>
                        <Typography variant="body1">
                            Today's Bite
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <SideBarBluePrimaryButton>
                        <Typography variant="body1">
                            Authors
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <SideBarBluePrimaryButton>
                        <Typography variant="body1">
                            Books
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <SideBarBluePrimaryButton>
                        <Typography variant="body1">
                            Passages
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
                <li>
                    <SideBarBluePrimaryButton>
                        <Typography variant="body1">
                            Time Periods
                        </Typography>
                    </SideBarBluePrimaryButton>
                </li>
            </ul>
        </div>
    )
}