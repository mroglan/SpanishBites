import React from 'react'
import {mount} from 'enzyme'

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

    const wrapper = mount(<SearchPanel settings={settings} setSettings={setSettings} search={search} 
        setFilters={setFilters} setSearch={setSearch} filters={filters} />)

    it('Updates search', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: 'hello world'}})
        wrapper.find('[data-testid="searchBtn"]').filter('button').simulate('click')
        expect(setSearch).toHaveBeenCalledWith('hello world')
    })
})