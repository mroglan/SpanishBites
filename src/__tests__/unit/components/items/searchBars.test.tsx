import React from 'react'
import {shallow, mount} from 'enzyme'

import {PrimarySearchBar} from '../../../../components/items/searchBars'

describe('Primary Search Bar', () => {

    const search = ''
    const setSearch = jest.fn(init => init)

    const wrapper = mount(<PrimarySearchBar search={search} setSearch={setSearch} />)

    it('Sets the search to user input when search button pressed', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: 'hello world'}})
        wrapper.find('[data-testid="searchBtn"]').filter('button').simulate('click')
        expect(setSearch).toHaveBeenCalledWith('hello world')
    })

    it('Clears the search when clear button is pressed', () => {
        wrapper.find('[data-testid="clearBtn"]').filter('button').simulate('click')
        expect(setSearch).toHaveBeenCalledWith('')
    })
})