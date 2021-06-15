import React from 'react'
import {shallow} from 'enzyme'

import SearchPanel from '../../../../../components/library/indexPage/SearchPanel'

describe('SearchPanel', () => {

    const search = ''
    const setFilters = jest.fn(val => null)
    const setSearch = jest.fn(val => null)
    const filters:any = {}
    const settings = {
        viewMode: 'carousel',
        transitions: true
    }
    const setSettings = jest.fn(val => null)

    const wrapper = shallow(<SearchPanel settings={settings} search={search} setSettings={setSettings}
         setFilters={setFilters} setSearch={setSearch} filters={filters} />)

    it('Displays filters dropdown when prompted', () => {
        wrapper.find('[data-testid="filters-dropdown-btn"]').simulate('click')
        expect(wrapper.find('[data-testid="filterspanel-container"]').length).toEqual(1)
    })
})