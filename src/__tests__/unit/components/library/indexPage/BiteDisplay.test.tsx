import React from 'react'
import {mount} from 'enzyme'

import BiteDisplay from '../../../../../components/library/indexPage/BiteDisplay'

describe('BiteDisplay', () => {

    const hideBite = jest.fn(() => null)

    const wrapper = mount(<BiteDisplay hideBite={hideBite} />)

    it('Calls hideBite function on click', () => {
        wrapper.find('[data-testid="bite-display-return-home-btn"]').filter('button').simulate('click')
        expect(hideBite).toHaveBeenCalled()
    })

    it('Includes author name and work', () => {
        expect(wrapper.find('[data-testid="bite-citation"]').length).toEqual(1)
    })

    it('Includes the text', () => {
        expect(wrapper.find('[data-testid="bite-text"]').length).toEqual(1)
    })

    it('Includes desc', () => {
        expect(wrapper.find('[data-testid="bite-desc"]').length).toEqual(1)
    })
})