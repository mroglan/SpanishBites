import {NextApiRequest, NextApiResponse} from 'next'
import {verifyUser} from '../../../utils/auth'
import {getSurvey, updateSurveyResponses} from '../../../utils/surveys'

export default verifyUser(async function AddResponse(req:NextApiRequest, res:NextApiResponse) {

    if(req.method !== 'POST') {
        return res.status(400).json({msg: 'Ok...'})
    }

    try {

        const survey = await getSurvey(req.body.name)

        if(!survey) {
            return res.status(400).json({msg: 'No survey exists with that name'})
        }

        const previousResponse = survey.responses.find(response => response.userId === req.body.jwtUser._id)

        if(previousResponse) {
            return res.status(400).json({msg: 'Already responded'})
        }

        const newResponses = [...survey.responses, {userId: req.body.jwtUser._id, values: req.body.values}]

        await updateSurveyResponses(survey._id, newResponses)

        return res.status(200).json({msg: 'Success...'})
    } catch(e) {
        return res.status(500).json({msg: 'Internal server error'})
    }
})