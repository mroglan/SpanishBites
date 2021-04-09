import React from 'react'
import {mount} from 'enzyme'

import List from '../../../../../../components/library/timePeriods/indexPage/List'
import styles from '../../../../../../styles/ResourceList.module.css'

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

    const books:any = [[{title: '', desc: '', timePeriod: '', authors: ['1'], genres: [], _id: '', image: '', detailedInfo: '' }], []]

    const wrapper = mount(<List timePeriods={timePeriods} authors={authors} books={books} />)

    it('Displays all books and authors', () => {
        expect(wrapper.find(`.${styles['content-list-container']}`).find('img').length).toEqual(4)
    })
})