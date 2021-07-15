import React, {useState, useRef} from 'react'
import styles from '../../../styles/Profile.module.css'
import {Box, Avatar, CircularProgress} from '@material-ui/core'
import { uploadImage } from '../../../utils/images'
import { ClientCookieUser } from '../../../database/dbInterfaces'
import {BlueDenseButton} from '../../items/buttons'

interface Props {
    user: ClientCookieUser;
}

export default function ProfilePic({user}:Props) {

    const imgInputRef = useRef<HTMLInputElement>()

    const [imgSrc, setImgSrc] = useState(user.image?.src)

    const [loading, setLoading] = useState(false)

    const handleFileUpload = async (e) => {
        setLoading(true)
        const file = e.target.files[0]
        try {
            const image = await uploadImage(file)
            setImgSrc(image.src)
        } catch(e) {}
        setLoading(false)
    }

    return (
        <div>
            <Box maxWidth={400}>
                <Box className={styles['pic-container']}>
                    <Avatar src={imgSrc || '/no-profile.jpg'} className={styles['pic-avatar']} />
                    {loading && <div className={styles['pic-loading']}>
                        <CircularProgress size={60} thickness={4} />
                    </div>}
                </Box>
                <Box textAlign="center" mt={2}>
                    <input ref={imgInputRef} className={styles['pic-input']} type="file" onChange={(e) => handleFileUpload(e)}
                    accept="image/*" />
                    <BlueDenseButton onClick={() => imgInputRef.current.click()}>
                        Change Picture
                    </BlueDenseButton>
                </Box>
            </Box>
        </div>
    )
}