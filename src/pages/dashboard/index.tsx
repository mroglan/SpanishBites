import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'
import { ensureAuth } from '../../utils/auth'

export default function Dashboard() {

    return (
        <div>
            dashboard
        </div>
    )
}

export const getServerSideProps:GetServerSideProps = async (ctx:GetServerSidePropsContext) => {
    await ensureAuth(ctx)
    return {props: {}}
}