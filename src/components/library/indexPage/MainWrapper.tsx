import React, {ReactNode, MutableRefObject, useRef, useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import { initialSettings, LibraryItems } from '../../../pages/library'
import { Settings } from './Settings'
import Main from './Main'
import {parseCookies} from 'nookies'

interface Props {
    items: LibraryItems;
}

interface DisplayMainProps extends Props {
    stringParams: MutableRefObject<string>;
    haveParams: boolean;
    query: any;
}

export function DisplayMain({stringParams, haveParams, query, items}:DisplayMainProps) {

    const [settings] = useState(JSON.parse(parseCookies().librarySettings || '{}'))

    if(haveParams) {
        if(!stringParams.current || JSON.stringify(query) !== '{}') {
            return <>
                <Main items={items} settings={settings && settings.viewMode ? settings : initialSettings} query={query} />
            </>
        } else {
            return <div></div>
        }
    } 

    return <div></div>
}

// curse nextjs for not allowing access to the query in getStaticProps
export default function MainWrapper({items}:Props) {

    const stringParams = useRef<string>()
    const firstLoad = useRef<boolean>()

    const [haveParams, setHaveParams] = useState(false)
    const [queryInfo, setQueryInfo] = useState({})

    const {query} = useRouter()

    useEffect(() => {
        console.log(window.location.search)
        stringParams.current = window.location.search
        setHaveParams(true)
    }, [])

    useEffect(() => { 
        if(!firstLoad.current) {
            if(JSON.stringify(query) !== '{}' || !stringParams.current) {
                firstLoad.current = true
            }
            setQueryInfo(query)
        }
    }, [query])

    return (
        <DisplayMain stringParams={stringParams} haveParams={haveParams} query={queryInfo} items={items} />
    )
}