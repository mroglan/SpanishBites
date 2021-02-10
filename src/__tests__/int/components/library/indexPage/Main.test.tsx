import React from 'react'
import {mount} from 'enzyme'
import styles from '../../../../../styles/Library.module.css'

import Main from '../../../../../components/library/indexPage/Main'

const baseAuthor = {firstName: '', lastName: '', birthDate: '', deathDate: '', timePeriod: {}, keyPoints: []}

const authors = Array(10).fill(baseAuthor).map((author, i) => ({...author, firstName: i}))

describe('Main Library', () => {

    const libraryItems:any = {
        authors,
        bite: {_id: '', name: '', author: '', image: '', work: '', text: '', desc: '', dates: []},
        books: [{_id: '', title: '1', desc: '', image: '', detailedInfo: '', genres: [], authors: [], timePeriod: {}}],
        timePeriods: [], genres: [], passages: []
    }

    const wrapper = mount(<Main items={libraryItems} />)

    it('Displays initial items', () => {
        expect(wrapper.find(`.${styles['preview-root']}`).length).toEqual(11)
    })

    it('Updates items on search', () => {
        wrapper.find('[data-testid="searchInput"]').simulate('change', {target: {value: '1'}})
        wrapper.find('[data-testid="searchBtn"]').filter('button').simulate('click')
        expect(wrapper.find(`.${styles['preview-root']}`).length).toEqual(2)
    })

    it('Updates items on filters change', () => {
        wrapper.find('[data-testid="sidebar-authors"]').filter('button').simulate('click')
        expect(wrapper.find(`.${styles['preview-root']}`).length).toEqual(1)
    })

    it('Displays bite when prompted', () => {
        wrapper.find('[data-testid="sidebar-bite"]').filter('button').simulate('click')
        expect(wrapper.find('[data-testid="bitedisplay-section"]').length).toEqual(1)
    })
})