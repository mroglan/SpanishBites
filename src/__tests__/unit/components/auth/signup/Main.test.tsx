import React from 'react'
import {shallow} from 'enzyme'

import Main from '../../../../../components/auth/signup/Main'
import Signup from '../../../../../components/forms/Signup'

describe('Main Signup', () => {

    const wrapper = shallow(<Main />)

    it('Contains the signup form', () => {
        expect(wrapper.find('[data-testid="signup-form-container"]').length).toEqual(1)
    })
})