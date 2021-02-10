import database from '../database/database'
import {DBAuthor} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const getAllAuthors = async () => {
    const db = await database()

    const authors:DBAuthor[] = await db.collection('authors').aggregate([
        {$lookup: {
            from: 'timePeriods',
            localField: 'timePeriod',
            foreignField: '_id',
            as: 'timePeriod'
        }},
        {$unwind: '$timePeriod'},
        {$unset: 'detailedInfo'}
    ]).sort({'lastName': 1}).toArray()
    
    return authors
}

export const getAllUnpopulatedAuthors = async () => {
    const db = await database()

    const authors:DBAuthor[] = await db.collection('authors').aggregate([
        {$unset: 'detailedInfo'}
    ]).sort({'lastName': 1}).toArray()

    return authors
}

export const getAuthor = async (id:ObjectId) => {
    const db = await database()

    const author:DBAuthor[] = await db.collection('authors').aggregate([
        {$match: {'_id': id}},
        {$lookup: {
            from: 'timePeriods',
            localField: 'timePeriod',
            foreignField: '_id',
            as: 'timePeriod'
        }},
        {$unwind: '$timePeriod'},
        {$unset: 'detailedInfo'}
    ]).toArray()

    return author[0]
}