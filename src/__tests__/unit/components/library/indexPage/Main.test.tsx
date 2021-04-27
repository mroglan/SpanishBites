import React from 'react'
import {shallow} from 'enzyme'

import Main from '../../../../../components/library/indexPage/Main'
import {initialSettings} from '../../../../../pages/library/index'

const libraryItems = {authors: [], books: [], timePeriods: [], genres: [], passages: [], bite: {
    _id: '', author: '', name: '', image: '', work: '', text: '', desc: '', dates: []
}}

describe('Main Library', () => {

    const wrapper = shallow(<Main items={libraryItems} query={{}} settings={initialSettings} />)

    it('Displays the sidebar', () => {
        expect(wrapper.find('[data-testid="library-sidebar"]').length).toEqual(1)
    })

    it('Displays the search panel', () => {
        expect(wrapper.find('[data-testid="searchpanel-section"]').length).toEqual(1)
    })

    it('Displays the active filters', () => {
        expect(wrapper.find('[data-testid="filtersdisplay-section"]').length).toEqual(1)
    })

    it('Displays the display panel', () => {
        expect(wrapper.find('[data-testid="displaypanel-section"]').length).toEqual(1)
    })
})