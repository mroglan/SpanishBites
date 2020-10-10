import database from '../database/database'
import {DBTimePeriod} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'

export const getAllTimePeriods = async () => {
    const db = await database()
    const timePeriods:DBTimePeriod[] = await db.collection('timePeriods').find({}).toArray()

    return timePeriods.sort((a, b) => Number(a.dateRange[0]) - Number(b.dateRange[0]))
}

export const getTimePeriod = async (id:ObjectId) => {
    const db = await database()
    const timePeriod:DBTimePeriod = await db.collection('timePeriods').findOne({'_id': id})
    
    return timePeriod
}