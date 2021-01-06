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

    it('Updates the search', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: 'hello world'}})
        expect(dispatch).toHaveBeenCalled()
    })

})