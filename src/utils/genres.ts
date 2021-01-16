import database from '../database/database'
import {Genre} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const getAllGenres = async () => {
    const db = await database()

    const genres:Genre[] = await db.collection('genres').find({}).toArray()

    return genres
}