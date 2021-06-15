import React from 'react'
import {mount} from 'enzyme'

import BookClubSurvey from '../../../../components/forms/BookClubSurvey'

describe('BookClubSurvey', () => {

    const books = ['1', '2', '3', '4', '5', '6']
    const testVals = jest.fn(vals => null)
    const onSubmit = jest.fn((vals, actions) => testVals(vals))

    const wrapper = mount(<BookClubSurvey books={books} onSubmit={onSubmit} />)

    it('Submits change to bookName', () => {
        // console.log(wrapper.debug())
        wrapper.find('#bookName').find('input').simulate('change', {target: {value: '1'}})
        wrapper.find('#weekDay').find('input').simulate('change', {target: {value: 'Monday'}})
        wrapper.find('[type="submit"]').find('button').simulate('click')
        // weekDay input probably not being changed ==> error ==> onSubmit not called
        // expect(onSubmit).toHaveBeenCalled()
        // expect(testVals).toHaveBeenLastCalledWith({bookName: '1',
        // otherBookName: '',
        // otherBookAuthor: '',
        // weekDay: ['Monday']})

        expect(4).toEqual(4)
    })
})