import React from 'react'
import {mount} from 'enzyme'

import Filters from '../../../../../../components/library/books/indexPage/Filters'

interface DispatchVal {
    type: string;
    payload: string;
}

describe('Book filters', () => {

    const filters = {search: '', mode: 'detailed'}
    const dispatch = jest.fn((val:DispatchVal) => val)

    const wrapper = mount(<Filters filters={filters} dispatch={dispatch} />)

    it('Updates the viewing mode', () => {
        wrapper.find('[data-testid="view-mode-input"]').filter('input').simulate('change', {target: {value: 'list'}})
        expect(dispatch).toHaveBeenCalledWith({type: 'CHANGE_MODE', payload: 'list'})
    })
})