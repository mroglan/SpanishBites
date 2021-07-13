import {NextApiRequest, NextApiResponse} from 'next'
import formidable from 'formidable'
import {v2 as cloudinary, UploadApiResponse} from 'cloudinary'
import { getUserFromApi, updateUserProfileImage } from '../../../../utils/users'
import { setCookie } from 'nookies'
import jwt from 'jsonwebtoken'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY,
    secure: process.env.NODE_ENV !== 'development'
})

export const config = {
    api: {
        bodyParser: false
    }
}

export default async function ProfileImage(req:NextApiRequest, res:NextApiResponse) {

    try {

        const user = await getUserFromApi(req)
        if(!user) {
            return res.status(404).json({msg: 'where\'s your account?'})
        }

        const form = formidable.IncomingForm()

        const {files} = await new Promise((resolve, reject) => {
            form.parse(req, (err, fields, files) => {
                if(err || !files.file.path) reject('error uploading file')
                resolve({files})
            })
        })

        const result:UploadApiResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload(files.file.path, {
                upload_preset: user.image?.publicId ? undefined : 'SBProfilePics',
                public_id: user.image?.publicId || undefined,
                overwrite: Boolean(user.image?.publicId),
                invalidate: true
            }, (err, result) => {
                if(err) reject('error uploading to cloudinary')
                resolve(result)
            })
        })

        await updateUserProfileImage(user._id, {
            src: result.secure_url,
            publicId: result.public_id
        })

        const claims = {...user, image: {src: result.secure_url, publicId: result.public_id}}

        const token = jwt.sign(claims, process.env.SIGNATURE)

        setCookie({res}, 'auth', token, {
            secure: process.env.NODE_ENV !== 'development',
            sameSite: true,
            maxAge: 172800,
            path: '/'
        })

        return res.status(200).json({src: result.secure_url})
    } catch(e) {    
        return res.status(500).json({msg: 'Internal server error'})
    }
}

