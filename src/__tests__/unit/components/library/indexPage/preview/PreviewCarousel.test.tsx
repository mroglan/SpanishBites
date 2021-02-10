import React from 'react'
import {shallow} from 'enzyme'

import PreviewCarousel from '../../../../../../components/library/indexPage/preview/PreviewCarousel'

describe('PreviewCarousel', () => {

    const item = {}
    const closePreview = jest.fn(() => null)

    const wrapper = shallow(<PreviewCarousel item={item} closePreview={closePreview} />)

    it('Closes preview when prompted', () => {
        wrapper.find('[data-testid="closepreview-btn"]').simulate('click')
        expect(closePreview).toHaveBeenCalled()
    })
})