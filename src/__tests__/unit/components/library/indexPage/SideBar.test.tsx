import React from 'react'
import {shallow} from 'enzyme'

import SideBar from '../../../../../components/library/indexPage/SideBar'
import {initialFilters} from '../../../../../components/library/indexPage/FiltersPanel'

describe('SideBar', () => {

    const setFilters = jest.fn(val => null)
    const closePopup = jest.fn(() => null)

    const wrapper = shallow(<SideBar setFilters={setFilters} />)

    it('Calls setFilters on selection', () => {
        wrapper.find('[data-testid="sidebar-authors"]').simulate('click')
        expect(setFilters).toHaveBeenCalledWith({...initialFilters, bite: false, libraryItem: 'authors'})
    })

    it('Calls setFilters on bite selection', () => {
        wrapper.find('[data-testid="sidebar-bite"]').simulate('click')
        expect(setFilters).toHaveBeenCalledWith({...initialFilters, bite: true})
    })

    const popupWrapper = shallow(<SideBar setFilters={setFilters} closePopup={closePopup} />)

    it('Calls closePopup on selection', () => {
        popupWrapper.find('[data-testid="sidebar-passages"]').simulate('click')
        expect(closePopup).toHaveBeenCalled()
    })

    it('Calls closePopup on bite selection', () => {
        popupWrapper.find('[data-testid="sidebar-bite"]').simulate('click')
        expect(closePopup).toHaveBeenCalled()
    })
})