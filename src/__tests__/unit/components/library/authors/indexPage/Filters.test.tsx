import React from 'react'
import {mount} from 'enzyme'

import Filters from '../../../../../../components/library/authors/indexPage/Filters'

interface DispatchVal {
    type: string;
    payload: string;
}

describe('Authors Filters', () => {

    const filters = {search: '', sort: 'lastName', mode: 'detailed'}
    const dispatch = jest.fn((val:DispatchVal) => val)

    const wrapper = mount(<Filters filters={filters} dispatch={dispatch} />)

    it('Updates the sort mode', () => {
        wrapper.find('[data-testid="authorSortInput"]').filter('input').simulate('change', {target: {value: 'firstName'}})
        expect(dispatch).toHaveBeenCalledWith({type: 'CHANGE_SORT', payload: 'firstName'})
    })

    it('Updates the viewing mode', () => {
        wrapper.find('[data-testid="authorModeInput"]').filter('input').simulate('change', {target: {value: 'list'}})
        expect(dispatch).toHaveBeenCalledWith({type: 'CHANGE_MODE', payload: 'list'})
    })

})