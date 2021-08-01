import React, {useState} from 'react'
import {Box, Paper, Typography} from '@material-ui/core'
import {Alert} from '@material-ui/lab'
import {BlueDenseButton} from '../../items/buttons'
import { ClientCookieUser } from '../../../database/dbInterfaces'
import Link from 'next/link'
import axios from 'axios'
import {mutate} from 'swr'
import Snackbar from '../../items/SnackbarMessage'

interface Props {
    user: ClientCookieUser;
    type: string;
    id: string;
}

export default function Preview({user, type, id}:Props) {

    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState({type: '', content: ''})

    const previewItem = async () => {

        setLoading(true)

        try {

            await axios({
                method: 'POST',
                url: '/api/auth/userinfo/add-preview',
                data: {type: type + 's', id}
            })

            await mutate(`/api/${type}s/${id}/premium`)
        } catch(e) {
            setLoading(false)
            if(e.response.status === 400) {
                return setMsg({type: 'error', content: 'No previews remaining'})
            } 
            if(e.response.status === 500) {
                return setMsg({type: 'error', content: 'Error adding preview'})
            }
        }
    }

    return (
        <div>
            <Paper elevation={3}>
                <Box p={3}>
                    <Box textAlign="center">
                        <Typography variant="h6">
                            {user ? 'Would you like to preview the premium resources for this ' + type + '?': 
                            'Create a free acount to preview premium resources'}
                        </Typography>
                    </Box>
                    {user && <Box mt={2}>
                        <Alert severity="info">
                            You have {5 - user.previews.length} previews remaining.
                        </Alert> 
                    </Box>}
                    <Box textAlign="center" mt={2}>
                        {user ? <BlueDenseButton disabled={loading} onClick={() => previewItem()}>
                            Preview
                        </BlueDenseButton> : <Link href="/signup">
                            <a>
                                <BlueDenseButton>
                                    Sign up
                                </BlueDenseButton>
                            </a>
                        </Link>} 
                    </Box>
                </Box>
            </Paper>
            <Snackbar message={msg} setMessage={setMsg} />
        </div>
    )
}