import React from 'react'
import {mount, shallow} from 'enzyme'

import Main from '../../../../../../components/library/authors/indexPage/Main'
import styles from '../../../../../../styles/ResourceList.module.css'

describe('Author Main Index Page', () => {

    const authors = [
        {_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
        timePeriod: {name: '', _id: '', dateRange: ['', ''], intro: '', worldEvents: [], spainEvents: []}},
        {_id: '2', firstName: 'lol', lastName: 'e', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
        timePeriod: {name: '', _id: '', dateRange: ['', ''], intro: '', worldEvents: [], spainEvents: []}}
    ]

    const wrapper = shallow(<Main authors={authors} />)

    it('Displays all authors', () => {
        expect(wrapper.find('[data-testid="listitem-container"]').length).toEqual(2)
    })

    it('Displays authors info', () => {
        expect(wrapper.find('[data-testid="listitem-container"]').length).toEqual(2)
    })

    // it('Displays author\'s name', () => {
    //     expect(wrapper.find('[data-testid="authorName"]').length).toEqual(2)
    // })

    // it('Displays author\'s image', () => {
    //     expect(wrapper.find('[data-testid="authorImg"]').length).toEqual(2)
    // })

    // it('Displays author\'s lifespan', () => {
    //     expect(wrapper.find('[data-testid="authorLifespan"]').length).toEqual(2)
    // })
})