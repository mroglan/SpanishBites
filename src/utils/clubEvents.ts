import {ClubEvent, OrganizedDBClubEvent} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'
import dayjs from 'dayjs'

const months = {'January': 0, 'February': 1, 'March': 2, 'April': 3, 'May': 4, 'June': 5, 'July': 6, 'August': 7, 'September': 8, 'October': 9, 'November': 10, 'December': 11}

export async function getCurrentClubEvent() {

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

export async function getEventsForYear(year:number) : Promise<OrganizedDBClubEvent[]> {
    const yearEvents:any = await client.query(
        q.Map(q.Paginate(q.Match(q.Index('clubEvents_by_year'), year.toString())), 
            q.Lambda('ref', q.Get(q.Var('ref'))) 
        )
    )

    return yearEvents.data.map(event => ({_id: event.ref.id, ...event.data})).sort((a, b) => months[a.month] - months[b.month])
}

export async function getEvent(month:string, year:number) {
    const yearEvents = await getEventsForYear(year)

    return yearEvents.find(event => event.month == month)
}

export async function getStartingBookList() {

    const books = await getEventsForYear(dayjs().year())

    return books.filter(book => months[book.month] <= dayjs().month())
}

export async function getClubEventsForMainBookClubPage() {

    const monthIndex = dayjs().month()
    const month = dayjs().format('MMMM')

    const year = dayjs().year() 

    const yearEvents = await getEventsForYear(year)

    const events = yearEvents.filter(event => months[event.month] <= monthIndex + 1)

    const map = {current: {}, next: {}, prev: []}

    if (monthIndex == 11) {
        map.current = events[events.length - 1]
        map.prev = events.filter(event => event.month != month)

        const nextYearEvents = await getEventsForYear(year + 1)

        const nextEvent = nextYearEvents.find(event => event.month == months[0])
        map.next = nextEvent

        return map
    }

    let totalEvents

    if (events.length < 7) {
        const prevYearEvents = await getEventsForYear(year - 1)

        totalEvents = prevYearEvents.concat(events)
    } else {
        totalEvents = events
    }

    map.current = events[events.length - 2]
    map.next = events[events.length - 1]

    events.pop()
    events.pop()
    map.prev = events

    return map
}