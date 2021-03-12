import React from 'react'
import {Box, Paper, Typography} from '@material-ui/core'
import styles from '../../../styles/Auth.module.css'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import Link from 'next/link'
import {PrimaryLink} from '../../items/links'

export default function NoToken() {

    return (
        <div className={styles['main-root']}>
            <div>
                <div className={styles['main-img-container']}>
                    <MailOutlineIcon color="secondary" style={{fontSize: 300}} />
                </div>
                <div className={styles['main-message-container']}>
                    <Box textAlign="center" mb={1}>
                        <Typography className={styles['catamaran']} variant="h3">
                            Verify your email address
                        </Typography>
                    </Box>
                    <Box textAlign="center">
                        <Typography variant="h6" component="span" className={styles['catamaran']}>
                            Check your inbox for an email we just sent you. If you don't receive an email in the next few minutes{' '}
                        </Typography>
                        <Link href="/auth/resendemail">
                            <a>
                                <PrimaryLink className={styles['catamaran']} variant="h6">
                                    resend it.
                                </PrimaryLink>
                            </a>
                        </Link> 
                    </Box>
                </div>
            </div>
        </div>
    )
}