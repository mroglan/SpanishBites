import React from 'react'
import {shallow} from 'enzyme'

import Resend from '../../../../../components/auth/verifyemail/Resend'

describe('Verify Email Resend', () => {

    const wrapper = shallow(<Resend />)

    it('Includes Email form', () => {
        expect(wrapper.find('[data-testid="email-form-container"]').length).toEqual(1)
    })
})