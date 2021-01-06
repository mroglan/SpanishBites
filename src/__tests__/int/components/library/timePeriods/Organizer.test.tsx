import React from 'react'
import {mount} from 'enzyme'

import Organizer from '../../../../../components/library/timePeriods/Organizer'

describe('TimePeriods Organizer', () => {

    const spainEvents = [
        {title: '', desc: '', location: '', image: '', date: ''},
        {title: '', desc: '', location: '', image: '', date: ''},
        {title: '', desc: '', location: '', image: '', date: ''},
        {title: '', desc: '', location: '', image: '', date: ''}
    ]

    const worldEvents = [
        {title: '', desc: '', location: '', image: '', date: ''},
        {title: '', desc: '', location: '', image: '', date: ''},
        {title: '', desc: '', location: '', image: '', date: ''}
    ]

    const wrapper = mount(<Organizer worldEvents={worldEvents} spainEvents={spainEvents} />)

    it('Displays all events', () => {
        expect(wrapper.find('[data-testid="eventItem"]').length).toEqual(7)
    })

    it('Shows only Spain Events', () => {
        wrapper.find('[data-testid="timePeriodViewMode"]').filter('input').simulate('change', {target: {value: 'spain'}})
        expect(wrapper.find('[data-testid="eventItem"]').length).toEqual(4)
    })

    it('Shows only World Events', () => {
        wrapper.find('[data-testid="timePeriodViewMode"]').filter('input').simulate('change', {target: {value: 'world'}})
        expect(wrapper.find('[data-testid="eventItem"]').length).toEqual(3)
    })
})