import React from 'react'
import styles from '../../../styles/Profile.module.css'
import {ClientCookieUser} from '../../../database/dbInterfaces'
import {Box} from '@material-ui/core'
import ProfilePic from './ProfilePic'
import BasicInfo from './BasicInfo'

interface Props {
    user: ClientCookieUser;
}

export default function Main({user}:Props) {

    return (
        <div>
            <Box mt={3} mx={3}>
                <div className={styles['root']}>
                    <div>
                        <ProfilePic user={user} />
                    </div>
                    <div>
                        <BasicInfo user={user} />
                    </div>
                </div>
            </Box>
        </div>
    )
}