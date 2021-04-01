import React from 'react'
import { ClientCookieUser } from '../../database/dbInterfaces'
import Title from './Title'
import Description from './Description'
import Survey from './Survey'

interface Props {
    user: ClientCookieUser | null;
}

export default function Main({user}:Props) {

    return (
        <div>
            <section>
                <Title />
            </section>
            <section>
                <Description />
            </section>
            <section>
                <Survey user={user} />
            </section>
        </div>
    )
}