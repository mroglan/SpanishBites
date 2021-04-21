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
        expect(wrapper.find('[data-testid="listitem-container"]').length).toEqual(2)
    })
})