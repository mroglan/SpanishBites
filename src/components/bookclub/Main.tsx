import React from 'react'
import { ClientClubEvent, ClientCookieUser } from '../../database/dbInterfaces'
import Current from './Current'

interface Props {
    event: ClientClubEvent | null;
}

export default function Main({event}:Props) {

    return (
        <div>
            <section>
                <Current event={event} />
            </section>
            <section>
                {/* Info for previous books and next months book */}
            </section>
        </div>
    )
}