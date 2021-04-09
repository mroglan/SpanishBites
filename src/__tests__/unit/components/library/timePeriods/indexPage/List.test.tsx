import React from 'react'
import {shallow} from 'enzyme'

import List from '../../../../../../components/library/timePeriods/indexPage/List'

describe('TimePeriods Index Page List', () => {

    const timePeriods = [
        {_id: '', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []},
        {_id: '', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []}
    ]
    const authors = [[{_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: ''}], []]
    const books:any = [[{_id: '1', title: '', authors: [], genres: [], desc: '', image: '', detailedInfo : '', timePeriod: {
        _id: '', name: '', intro: '', dates: [], spainEvents: [], worldEvents: []
    }}], []]

    const wrapper = shallow(<List timePeriods={timePeriods} authors={authors} books={books} />)

    it('Lists all period names', () => {
        expect(wrapper.find('[data-testid="periodListItemName"]').length).toEqual(2)
    })

    it('Displays all period intros', () => {
        expect(wrapper.find('[data-testid="periodListItemIntro"]').length).toEqual(2)
    })
})