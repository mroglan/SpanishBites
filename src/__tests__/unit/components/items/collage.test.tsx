import React from 'react'
import {shallow} from 'enzyme'

import {SmallCollage} from '../../../../components/items/collage'
import styles from '../../../../styles/Collage.module.css'

const testImages = [
    {url: 'hello', linkAs: 'hello', linkHref: 'hello'},
    {url: 'hello', linkAs: 'hello', linkHref: 'hello'}
]

describe('Small Collage', () => {

    const wrapper = shallow(<SmallCollage images={testImages} />)

    it('renders in all images', () => {
        expect(wrapper.find(`.${styles['small-root']}`).children()).toHaveLength(2)
    })
})