import {OrganizedDBSpanishBite} from '../database/dbInterfaces'
import dayjs from 'dayjs'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const getTodayBite = async () => {

    const todayDate = dayjs().format('YYYY-MM-DD')

    const bite:OrganizedDBSpanishBite = await client.query(
        q.If(
            q.Exists(q.Match(q.Index('dailyEvents_by_date'), todayDate)),
            q.Let(
                {eventDoc: q.Get(q.Match(q.Index('dailyEvents_by_date'), todayDate))},
                q.If(
                    q.Exists(q.Ref(q.Collection('bites'), q.Select(['data', 'bite', 'id'], q.Var('eventDoc'), '555555555555555555'))),
                    q.Merge(
                        q.Select(['data'], q.Get(q.Select(['data', 'bite'], q.Var('eventDoc')))), {_id: q.Select(['data', 'bite', 'id'], q.Var('eventDoc'))}
                    ),
                    null
                )
            ),
            null
        )
    )

    return bite
}
