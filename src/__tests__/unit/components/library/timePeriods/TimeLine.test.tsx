import React from 'react'
import {shallow} from 'enzyme'

import TimeLine from '../../../../../components/library/timePeriods/TimeLine'

describe('Timeperids timeline', () => {

    const events = [
        {title: '', desc: '', location: '', image: '', date: '', type: '', side: 'left'},
        {title: '', desc: '', location: 'present', image: '', date: '', type: '', side: 'left'},
        {title: '', desc: '', location: '', image: '', date: '', type: '', side: 'left'}
    ]

    const wrapper = shallow(<TimeLine events={events} />)

    it('Displays correct amount of events', () => {
        expect(wrapper.find('[data-testid="eventItem"]').length).toEqual(3)
    })

    it('Displays event dates', () => {
        expect(wrapper.find('[data-testid="eventDate"]').length).toEqual(3)
    })

    it('Displays event location if available', () => {
        expect(wrapper.find('[data-testid="eventLocation"]').length).toEqual(1)
    })

    it('Displays event descriptions', () => {
        expect(wrapper.find('[data-testid="eventDescription"]').length).toEqual(3)
    })

    it('Displays event images', () => {
        expect(wrapper.find('[data-testid="eventImage"]').length).toEqual(3)
    })
})