import {NextApiRequest, NextApiResponse} from 'next'
import {getAllUnpopulatedAuthors} from '../../../utils/authors'
import {getAllUnpopulatedBooks} from '../../../utils/books'
import {getAllTimePeriods} from '../../../utils/timePeriods'
import {getAllGenres} from '../../../utils/genres'
import {getAllPassages} from '../../../utils/passages'
import {getTodayBite} from '../../../utils/bites'

export default async function Library(req:NextApiRequest, res:NextApiResponse) {

    try {

        const [authors, books, timePeriods, genres, passages, bite] = await Promise.all([getAllUnpopulatedAuthors(), 
            getAllUnpopulatedBooks(), getAllTimePeriods(), getAllGenres(), getAllPassages(), getTodayBite()])


        res.setHeader('Cache-control', 's-maxage=1800, stale-while-revalidate')
        return res.status(200).json({authors, books, timePeriods, genres, passages, bite})
    } catch(e) {
        return res.status(500).json({})
    }
}