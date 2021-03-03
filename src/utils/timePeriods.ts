import {DBTimePeriod} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getAllTimePeriods = async () => {

    const rawPeriods:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('all_timePeriods'))), (ref) => q.Get(ref))
    )

    const timePeriods = rawPeriods.data.map(period => ({...period.data, _id: period.ref.id}))

    return timePeriods.sort((a, b) => Number(a.dateRange[0]) - Number(b.dateRange[0]))
}

export const getTimePeriod = async (id:string) => {

    const timePeriod:any = await client.query(
        q.Get(q.Ref(q.Collection('timePeriods'), id))
    )
    
    return {...timePeriod.data, _id: timePeriod.ref.id}
}