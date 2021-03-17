import React from 'react'
import {shallow, mount} from 'enzyme'

import WithToken, {LoadingScreen, FormScreen} from '../../../../../components/auth/forgotpassword/WithToken'

describe('Forgot Password With Token', () => {

    const wrapper = shallow(<WithToken token="555" />)

    it('Shows loading screen at first', () => {
        expect(wrapper.containsMatchingElement(<LoadingScreen />)).toEqual(true)
    })
})