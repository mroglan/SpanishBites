import React from 'react'
import { ClientClubEvent, ClientCookieUser } from '../../database/dbInterfaces'
import Current from './Current'

interface Props {
    events: {current: ClientClubEvent; prev: ClientClubEvent[]; next: ClientClubEvent;};
}

export default function Main({events}:Props) {

    return (
        <div>
            <section>
                <Current events={events} />
            </section>
            <section>
                {/* Info for previous books and next months book */}
            </section>
        </div>
    )
}