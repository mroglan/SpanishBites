import React from 'react'
import {shallow} from 'enzyme'

import WithToken, {LoadingScreen} from '../../../../../components/auth/verifyemail/WithToken'

describe('Verify Email With Token', () => {

    const wrapper = shallow(<WithToken token="555" />)

    it('Displays the loading screen', () => {
        expect(wrapper.containsMatchingElement(<LoadingScreen />)).toEqual(true)
    })
})