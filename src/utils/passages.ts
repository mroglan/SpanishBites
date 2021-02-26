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
        {$unwind: {path: '$book', preserveNullAndEmptyArrays: true}}, 
        {$lookup: {
            from: 'authors', 
            localField: 'authors',
            foreignField: '_id', 
            as: 'authors'
        }},
        {$unset: ['annotations', 'commentary']},
    ]).toArray()

    return passages
}

export const getPassage = async (id:ObjectId) => {
    const db = await database()

    const passage:DBPassage[] = await db.collection('passages').aggregate([
        {$match: {'_id': id}},
        {$lookup: {
            from: 'books', 
            let: {'bookId': '$book'},
            pipeline: [
                {$match: {$expr: {$eq: ['$_id', '$$bookId']}}},
                {$lookup: {
                    from: 'timePeriods',
                    localField: 'timePeriod',
                    foreignField: '_id',
                    as: 'timePeriod'
                }},
                {$unwind: '$timePeriod'},
                {$lookup: {
                    from: 'authors',
                    localField: 'authors',
                    foreignField: '_id',
                    as: 'authors'
                }},
                {$lookup: {
                    from: 'genres',
                    localField: 'genres',
                    foreignField: '_id',
                    as: 'genres'
                }}
            ],
            as: 'book'
        }},
        {$unwind: '$book'},
        {$lookup: {
            from: 'authors', 
            localField: 'authors',
            foreignField: '_id', 
            as: 'authors'
        }},
        {$unset: ['annotations', 'commentary']}
    ]).toArray()

    return passage[0]
}