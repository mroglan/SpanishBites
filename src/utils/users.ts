import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import {NextApiRequest} from 'next'
import jwt from 'jsonwebtoken'
import {GeneralItem, OrganizedDBUser, DBUser, ClientCookieUser, RecentlyViewedItem, UserImage} from '../database/dbInterfaces'
import dayjs from 'dayjs'

interface UserInfo {
    name: string;
    password: string;
    email: string;
}

export const isUserWithEmail = async (email:string) => {

    return await client.query(
        q.If(
            q.Exists(q.Match(q.Index('users_by_email'), email)),
            true,
            false
        )
    )
}

export const isUserWithUsername = async (username:string) => {

    return await client.query(
        q.If(
            q.Exists(q.Match(q.Index('users_by_username'), username)),
            true, 
            false
        )
    )
}

const getRandomDigits = () => Math.floor(Math.random() * 1000000)

const findUniqueUsername = async (name:string) => {

    const noSpaceUsername = name.split(' ').join('_')

    let newUsername = noSpaceUsername + getRandomDigits().toString()

    while(await isUserWithUsername(newUsername)) {
        newUsername = noSpaceUsername + getRandomDigits().toString()
    }

    return newUsername
}

export const createUser = async (info:UserInfo) => {

    const username = await findUniqueUsername(info.name)

    const data = {...info, username, isAdmin: false, isVerified: true, premiumExpiration: '', previews: [], recentlyViewed: [], image: ''}

    await client.query(
        q.Create(q.Collection('users'), {data})
    )
}

export const getUser = async (id:string):Promise<OrganizedDBUser> => {

    const user:DBUser = await client.query(
        q.Get(q.Ref(q.Collection('users'), id))
    )

    return {...user.data, _id: user.ref.id}
}

export const getUserFromEmail = async (email:string):Promise<OrganizedDBUser> => {

    const user:DBUser = await client.query(
        q.Let(
            {userRef: q.Match(q.Index('users_by_email'), email)},
            q.If(
                q.Exists(q.Var('userRef')),
                q.Get(q.Var('userRef')),
                null
            )
        )
    )

    return user ? {...user.data, _id: user.ref.id} : null
}

export const updateUserPassword = async (id:string, password:string) => {

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {password}})
    )
}

interface UserInfoValues {
    name: string;
    username: string;
}

export const updateBasicUserInfo = async (id:string, values:UserInfoValues) => {

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {...values}})
    )
}

export const updateUserProfileImage = async (id:string, image:UserImage) => {

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {image}})
    )
}

export async function getUserFromApi(req:NextApiRequest) {

    try {

        const user:ClientCookieUser = await new Promise((res, rej) => {
            jwt.verify(req.cookies.auth, process.env.SIGNATURE, (err, decoded) => {
                if(!err && decoded) res(decoded)
                rej('Not Signed In')
            })
        })

        return user
    } catch(e) {
        return null
    }
}

export async function addToRecentlyAdded(id:string, items:GeneralItem[]) {

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {recentlyViewed: items}})
    )
}

export async function getRecentlyViewed(id:string) {

    const recentlyViewed:RecentlyViewedItem[] = await client.query(
        q.Let(
            {userDoc: q.Get(q.Ref(q.Collection('users'), id))},
            q.Map(q.Select(['data', 'recentlyViewed'], q.Var('userDoc')), q.Lambda('item', q.If(
                q.Exists(q.Ref(q.Collection(q.Select(['type'], q.Var('item'))), q.Select(['id'], q.Var('item')))),
                q.Merge(
                    q.Select(['data'], q.Get(q.Ref(q.Collection(q.Select(['type'], q.Var('item'))), q.Select(['id'], q.Var('item'))))),
                    {_id: q.Select(['id'], q.Var('item')), type: q.Select(['type'], q.Var('item'))}
                ),
                null
            )))
        )
    )

    return recentlyViewed
}

export async function addPremium(id:string) {

    const date = dayjs().add(1, 'year').format('YYYY-MM-DD')

    await client.query(
        q.Update(q.Ref(q.Collection('users'), id), {data: {premiumExpiration: date}})
    )
}