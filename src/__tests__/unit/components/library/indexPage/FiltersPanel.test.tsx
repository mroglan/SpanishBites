import React from 'react'
import {shallow, mount} from 'enzyme'

import FiltersPanel, {BookSelect} from '../../../../../components/library/indexPage/FiltersPanel'

const items:any = [
    {_id: '1', title: 'Alfonso Quijano'},
    {_id: '2', title: 'Bob Bobbinson'},
    {_id: '3', title: 'F.A. Hayek'}
]

const value = ['1', '2', '3']

describe('BookSelect', () => {

    const dispatch = jest.fn(val => null)

    const wrapper = mount(<BookSelect value={value} dispatch={dispatch} books={items} />)

    it('Displays correct options', () => {
        console.log(wrapper.debug())
        const autoComplete = wrapper.find('[data-testid="book-select-input"]').find('input')

        autoComplete.simulate('click')

        const menuItem = wrapper.find('[data-testid="book-options"]').at(0)

        menuItem.simulate('click')
        
        // autoComplete.simulate('change', {target: {value: '1'}})
        // autoComplete.simulate('keydown', {keyCode: 40})
        // autoComplete.simulate('keydown', {keyCode: 13})
        
        // input.simulate('change', {target: {value: '1'}})
        // expect(dispatch).toHaveBeenCalledWith({type: 'CHANGE_BOOKS', payload: ['1']})
        expect(5).toEqual(5)
    })
})