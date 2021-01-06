import React from 'react'
import {mount} from 'enzyme'

import Main from '../../../../../../components/library/timePeriods/indexPage/Main'
import styles from '../../../../../../styles/ResourceList.module.css'

describe('TimePeriods Index Page Main', () => {

    const timePeriods = [
        {_id: 'period1', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []},
        {_id: 'period2', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []}
    ]
    const authors = [{_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: 'period1'},
    {_id: '2', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: 'period2'},
    {_id: '3', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: 'period1'},
    {_id: '4', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: 'period2'},
    {_id: '5', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
    timePeriod: 'period2'}]

    const wrapper = mount(<Main timePeriods={timePeriods} authors={authors} />)

    it('Displays correct number of time periods', () => {
        expect(wrapper.find(`.${styles['period-root']}`).length).toEqual(2)
    })

    it('Sorts authors to each Time Period', () => {
        expect(wrapper.find('[data-testid="periodListItemAuthorCollage"]').at(0).find('[data-testid="smallCollageImage"]').length).toEqual(2)
        expect(wrapper.find('[data-testid="periodListItemAuthorCollage"]').at(1).find('[data-testid="smallCollageImage"]').length).toEqual(3)
    })

    it('Populates TabNav with periods', () => {
        expect(wrapper.find('[data-testid="periodTabName"]').filter('p').length).toEqual(2)
    })
})