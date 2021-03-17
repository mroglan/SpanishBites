import React from 'react'
import {shallow, mount} from 'enzyme'

import Main from '../../../../../components/auth/login/Main'
import Login from '../../../../../components/forms/Login'

describe('Main Login', () => {

    const wrapper = shallow(<Main />)

    it('Contains the Login form', () => {
        expect(wrapper.containsMatchingElement(<Login vals={{email: ''}} onSubmit={(a, b) => null} />))
    })
})

