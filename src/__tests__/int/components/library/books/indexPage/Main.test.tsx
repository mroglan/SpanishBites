import React from 'react'
import {mount} from 'enzyme'

import Main from '../../../../../../components/library/books/indexPage/Main'

describe('Main Book Index Page', () => {

    const books = [
        {_id: '1', title: 'hello', desc: '', image: '', detailedInfo: '', genres: [], authors: [], timePeriod: ''},
        {_id: '2', title: 'world', desc: '', image: '', detailedInfo: '', genres: [], authors: [], timePeriod: ''}
    ]

    const wrapper = mount(<Main books={books} />)

    it('Changes view mode', () => {
        expect(wrapper.find('[data-testid="listitem-container"]').length).toEqual(2)
        wrapper.find('[data-testid="view-mode-input"]').filter('input').simulate('change', {target: {value: 'list'}})
        expect(wrapper.find('[data-testid="list-book-item"]').length).toEqual(2)
    })

    it('Limits books when searched', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: 'hello'}})
        wrapper.find('[data-testid="searchBtn"]').filter('button').simulate('click')
        expect(wrapper.find('[data-testid="list-book-item"]').length).toEqual(1)
    }) 
})