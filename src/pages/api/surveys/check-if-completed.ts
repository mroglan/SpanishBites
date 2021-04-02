import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../utils/auth'
import {getSurvey} from '../../../utils/surveys'

export default async function CheckIfCompleted(req:NextApiRequest, res:NextApiResponse) {

    try {

        const surveyName = req.query.name as string
        const userId = req.query.user as string

        const survey = await getSurvey(surveyName)

        if(!survey) {
            return res.status(400).json({msg: 'No survey exists with that name'})
        }

        const userResponse = survey.responses.find(response => response.userId === userId)

        if(userResponse) {
            return res.status(200).json({msg: 'completed', completed: true})
        }

        return res.status(200).json({msg: 'not completed', completed: false})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
}