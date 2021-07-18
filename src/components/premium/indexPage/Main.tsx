import React from 'react'
import EntryBanner from './EntryBanner'
import PrimaryReasons from './PrimaryReasons'
import GetStarted from './GetStarted'

export default function Main() {

    return (
        <div>
            <div>
                <EntryBanner />
            </div>
            <div>
                <PrimaryReasons />
            </div>
            <div>
                <GetStarted />
            </div>
        </div>
    )
}