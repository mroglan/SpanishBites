import axios from 'axios'

export async function uploadImage(file) {

    const formData = new FormData()
    formData.append('file', file)

    const {data} = await axios({
        method: 'POST',
        data: formData,
        url: '/api/auth/upload/profile-image'
    })

    return data
}