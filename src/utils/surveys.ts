import {DBSurvey} from '../database/dbInterfaces'
import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const updateSurveyResponses = async (id:string, responses:any[]) => {

    await client.query(
        q.Update(q.Ref(q.Collection('surveys'), id), {data: {responses}})
    )
}

export const getSurvey = async (name:string) => {

    const survey:DBSurvey = await client.query(
        q.Get(q.Match(q.Index('surveys_by_name'), name))
    )

    return {...survey.data, _id: survey.ref.id}
}