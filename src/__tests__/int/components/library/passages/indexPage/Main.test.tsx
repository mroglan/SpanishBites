import React from 'react'
import {mount} from 'enzyme'

import Main from '../../../../../../components/library/passages/indexPage/Main'

describe('Passage Main Index Page', () => {

    const passages = [
        {_id: '1', name: 'hello', desc: '', englishText: '', spanishText: '', commentary: '', vocab: [], annotations: '',
        book: {_id: '1', genres: [], authors: [], timePeriod: '', title: '', desc: '', image: '', detailedInfo: ''}}, 
        {_id: '2', name: 'world', desc: '', englishText: '', spanishText: '', commentary: '', vocab: [], annotations: '',
        book: {_id: '1', genres: [], authors: [], timePeriod: '', title: '', desc: '', image: '', detailedInfo: ''}}
    ]

    const wrapper = mount(<Main passages={passages} />)

    it('Changes view mode', () => {
        expect(wrapper.find('[data-testid="detailed-passage-item"]').length).toEqual(2)
        wrapper.find('[data-testid="view-mode-input"]').filter('input').simulate('change', {target: {value: 'list'}})
        expect(wrapper.find('[data-testid="list-passage-item"]').length).toEqual(2)
    })

    it('Limits authors when searched', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: 'hello'}})
        wrapper.find('[data-testid="searchBtn"]').filter('button').simulate('click')
        expect(wrapper.find('[data-testid="list-passage-item"]').length).toEqual(1)
    }) 
})