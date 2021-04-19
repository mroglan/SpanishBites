import React from 'react'
import {mount} from 'enzyme'

import Main from '../../../../../../components/library/authors/indexPage/Main'
import styles from '../../../../../../styles/ResourceList.module.css'

describe('Author Main Index Page', () => {

    const authors = [
        {_id: '1', firstName: 'test', lastName: 'a', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
        timePeriod: {name: '', _id: '', dateRange: ['', ''], intro: '', worldEvents: [], spainEvents: []}},
        {_id: '2', firstName: 'lol', lastName: 'e', keyPoints: [''], relevantWorks: [], birthDate: '', deathDate: '', image: '', detailedInfo: '',
        timePeriod: {name: '', _id: '', dateRange: ['', ''], intro: '', worldEvents: [], spainEvents: []}}
    ]

    const wrapper = mount(<Main authors={authors} />)

    it('Changes view mode', () => {
        expect(wrapper.find('[data-testid="listitem-container"]').length).toEqual(2)
        wrapper.find('[data-testid="authorModeInput"]').filter('input').simulate('change', {target: {value: 'list'}})
        expect(wrapper.find('[data-testid="listAuthorItem"]').length).toEqual(2)
    })

    it('Updates the sorting mode', () => {
        expect(wrapper.find('[data-testid="listAuthorItem"]').at(0).text()).toEqual('test a')
        wrapper.find('[data-testid="authorSortInput"]').filter('input').simulate('change', {target: {value: 'firstName'}})
        expect(wrapper.find('[data-testid="listAuthorItem"]').at(0).text()).toEqual('lol e')
    })

    it('Limits authors when searched', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: 'test'}})
        wrapper.find('[data-testid="searchBtn"]').filter('button').simulate('click')
        expect(wrapper.find('[data-testid="listAuthorItem"]').length).toEqual(1)
    }) 

})