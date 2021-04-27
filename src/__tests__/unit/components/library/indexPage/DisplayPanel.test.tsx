import React from 'react'
import {shallow} from 'enzyme'
import styles from '../../../../../styles/Library.module.css'

import DisplayPanel, {Panel} from '../../../../../components/library/indexPage/DisplayPanel'
import {initialSettings} from '../../../../../pages/library/index'

describe('DisplayPanel', () => {

    const items = Array(10).fill({type: 'author', firstName: 'bob', lastName: 'bobbinson', keyPoints: []})

    const wrapper = shallow(<DisplayPanel items={items} settings={initialSettings} />)

    // cant check # of panels but can check preview panels

    it('Contains preview items', () => {
        expect(wrapper.find(`.${styles['preview-panel']}`).length).toEqual(10)
    })
})

describe('DisplayPanel Panel', () => {
    const item = [{type: 'author', title: 'bobby'}, {type: 'author', title: 'bobby'}, {type: 'author', title: 'bobby'}, {type: 'author', title: 'bobby'}]
    const openPreview = jest.fn(val => val)

    const wrapper = shallow(<Panel i={2} rows={2} cols={3} panel={item} openPreview={openPreview} />)

    it('Displays correct number of rows', () => {
        expect(wrapper.find(`.${styles['display-panel-row']}`).length).toEqual(2)
    })

    it('Displays corrent # cols per row', () => {
        expect(wrapper.find(`.${styles['display-panel-row']}`).first().find(`.${styles['display-item']}`).length).toEqual(3)
        expect(wrapper.find(`.${styles['display-panel-row']}`).at(1).find(`.${styles['display-item']}`).length).toEqual(1)
    })

    it('Displays correct titles', () => {
        expect(wrapper.find(`.${styles['display-item-title']}`).first().text()).toEqual('bobby')
    })

    it('Displays correct types', () => {
        expect(wrapper.find(`.${styles['display-item-type']}`).first().text()).toEqual('AUTHOR')
    })

    it('Opens correct preview', () => {
        wrapper.find(`.${styles['display-panel-row']}`).at(0).find(`.${styles['display-item']}`).at(2).simulate('click')
        expect(openPreview).toHaveBeenCalledWith(14)
    })
})