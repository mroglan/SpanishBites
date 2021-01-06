import React from 'react'
import {mount} from 'enzyme'

import List from '../../../../../../components/library/timePeriods/indexPage/List'

describe('TimePeriods Index Page List', () => {

    const timePeriods = [
        {_id: '', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []},
        {_id: '', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []}
    ]
    const authors = [[{_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: ''},
    {_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: ''}], [{_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: ''}]]

    const wrapper = mount(<List timePeriods={timePeriods} authors={authors} />)

    it('Displays all author collage images', () => {
        expect(wrapper.find('[data-testid="periodListItemAuthorCollage"]').find('[data-testid="smallCollageImage"]').length).toEqual(3)
    })
})