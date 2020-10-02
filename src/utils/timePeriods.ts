import database from '../database/database'
import {DBTimePeriod} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const getTimePeriod = async (id:ObjectId) => {
    const db = await database()
    const timePeriod:DBTimePeriod = await db.collection('timePeriods').findOne({'_id': id})
    
    return timePeriod
}