import {ClubEvent} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import dayjs from 'dayjs'

export async function getCurrentClubEvent() {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = months[dayjs().month()]

    const year = dayjs().year() 

    const yearEvents:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('clubEvents_by_year'), year.toString())), 
            q.Lambda('ref', q.Get(q.Var('ref'))) 
        )
    )

    const event = yearEvents.data.filter(event => event.data.month == month)

    if (event) {
        return {_id: event[0].ref.id, ...event[0].data}
    } else {
        return null
    }
}