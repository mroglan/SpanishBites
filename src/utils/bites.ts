import database from '../database/database'
import {DBSpanishBite, DBDailyEvent} from '../database/dbInterfaces'
import {ObjectId} from 'mongodb'
import dayjs from 'dayjs'

export const getTodayBite = async () => {
    const db = await database()

    const dateRange = {min: new Date(dayjs().add(-1, 'day').toISOString()), max: new Date(dayjs().toISOString())}

    const dailyEvents = await db.collection('dailyEvents').aggregate([
        {$match: {
            date: {$gte: (dateRange.min), $lte: (dateRange.max)}
        }},
        {$lookup: {
            from: 'bites', 
            localField: 'bite',
            foreignField: '_id',
            as: 'bite'
        }},
        {$unwind: '$bite'}
    ]).toArray()

    const bite:DBSpanishBite = dailyEvents[0].bite

    return bite
}
