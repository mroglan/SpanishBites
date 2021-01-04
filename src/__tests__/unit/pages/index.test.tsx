import React from 'react'
import {shallow} from 'enzyme'

import App from '../../../pages/index'
import FirstBanner from '../../../components/home/FirstBanner'
import styles from '../../../styles/Home.module.css'

describe('Landing Page', () => {
    const wrapper = shallow(<App />)

    it('Has a header', () => {
        expect(wrapper.find(`.${styles.header}`).exists()).toBeTruthy()
    })

    it('Has a First Banner', () => {
        expect(wrapper.find(FirstBanner).exists()).toBeTruthy()
    })

    it('Has a footer', () => {
        expect(wrapper.find(`.${styles.footer}`).exists()).toBeTruthy()
    })
})