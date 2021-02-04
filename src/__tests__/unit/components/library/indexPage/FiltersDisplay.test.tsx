import React from 'react'
import {mount} from 'enzyme'

import FiltersDisplay from '../../../../../components/library/indexPage/FiltersDisplay'
import {initialFilters} from '../../../../../components/library/indexPage/FiltersPanel'

describe('FiltersDisplay', () => {

    const filters = {...initialFilters, libraryItem: 'Authors', birthDate: '1500', deathDate: '1600'}
    const setFilters = jest.fn((val) => val)

    const wrapper = mount(<FiltersDisplay filters={filters} setFilters={setFilters} />)

    it('Displays correct number of filters', () => {
        expect(wrapper.find('[data-testid="filter-chip"]').length).toEqual(3)
    })

    it('Deletes filter on click', () => {
        wrapper.find('[data-testid="filter-chip"] svg').first().simulate('click')
        expect(setFilters).toHaveBeenCalledWith({...initialFilters, birthDate: '1500', deathDate: '1600', libraryItem: 'none'})
    })
})