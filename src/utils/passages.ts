import database from '../database/database'
import {DBPassage} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const getAllPassages = async () => {
    const db = await database()

    const passages = await db.collection('passages').aggregate([
        {$lookup: {
            from: 'books',
            localField: 'book',
            foreignField: '_id',
            as: 'book'
        }},
        {$unwind: '$book'},
        {$unset: ['annotations', 'commentary']}
    ]).toArray()

    return passages
}