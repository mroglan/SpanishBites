import {client} from '../database/fauna-db'
import {query as q} from 'faunadb'

export const updateSurveyResponses = async (name:string, responses:any[]) => {

    await client.query(
        q.Update(q.Match(q.Index('surveys_by_name'), name), {data: {responses}})
    )
}

export const getSurvey = async (name:string) => {

    const survey:any = await client.query(
        q.Get(q.Match(q.Index('surveys_by_name'), name))
    )

    return {...survey.data, _id: survey.ref.id}
}