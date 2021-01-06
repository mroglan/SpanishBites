import React from 'react'
import {shallow} from 'enzyme'

import TabNav from '../../../../../../components/library/timePeriods/indexPage/TabNav'

describe('TimePeriod TabNav', () => {

    const timePeriods = [
        {_id: '', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []},
        {_id: '', name: '', dateRange: [], intro: '', spainEvents: [], worldEvents: []}
    ]

    const wrapper = shallow(<TabNav timePeriods={timePeriods} />)

    it('Displays each time period', () => {
        expect(wrapper.find('[data-testid="periodTabName"]').length).toEqual(2)
    })
})