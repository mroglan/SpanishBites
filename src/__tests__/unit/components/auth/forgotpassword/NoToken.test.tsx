import React from 'react'
import {shallow} from 'enzyme'

import NoToken from '../../../../../components/auth/forgotpassword/NoToken'
import Email from '../../../../../components/forms/Email'

describe('Forgot Password No Token', () => {

    const wrapper = shallow(<NoToken />)

    it('Contains the Email form', () => {
        expect(wrapper.find('[data-testid="email-form-container"]').length).toEqual(1)
    })
})