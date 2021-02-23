import React from 'react'
import {shallow} from 'enzyme'

import Main from '../../../../../../components/library/books/indexPage/Main'

describe('Book Main Index Page', () => {

    const books = [
        {_id: '1', title: '', desc: '', image: '', detailedInfo: '', genres: [], authors: [], timePeriod: ''},
        {_id: '2', title: '', desc: '', image: '', detailedInfo: '', genres: [], authors: [], timePeriod: ''}
    ]

    const wrapper = shallow(<Main books={books} />)

    it('Displays all books', () => {
        expect(wrapper.find('[data-testid="detailed-book-item"]').length).toEqual(2)
    })

    it('Displays books\'s name', () => {
        expect(wrapper.find('[data-testid="book-name"]').length).toEqual(2)
    })

    it('Displays books\'s image', () => {
        expect(wrapper.find('[data-testid="book-img"]').length).toEqual(2)
    })

    it('Displays books\'s lifespan', () => {
        expect(wrapper.find('[data-testid="book-authors"]').length).toEqual(2)
    })
})