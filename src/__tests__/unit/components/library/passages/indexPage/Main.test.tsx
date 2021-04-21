import React from 'react'
import {shallow} from 'enzyme'

import Main from '../../../../../../components/library/passages/indexPage/Main'

describe('Passage Main Index Page', () => {

    const passages = [
        {_id: '1', name: '', desc: '', englishText: '', spanishText: '', commentary: '', vocab: [], annotations: '',
        book: {_id: '1', genres: [], authors: [], timePeriod: '', title: '', desc: '', image: '', detailedInfo: ''}}, 
        {_id: '2', name: '', desc: '', englishText: '', spanishText: '', commentary: '', vocab: [], annotations: '',
        book: {_id: '1', genres: [], authors: [], timePeriod: '', title: '', desc: '', image: '', detailedInfo: ''}}
    ]

    const wrapper = shallow(<Main passages={passages} />)

    it('Displays all passages', () => {
        expect(wrapper.find('[data-testid="listitem-container"]').length).toEqual(2)
    })

    // it('Displays passage\'s name', () => {
    //     expect(wrapper.find('[data-testid="passage-name"]').length).toEqual(2)
    // })

    // it('Displays passage\'s image', () => {
    //     expect(wrapper.find('[data-testid="passage-img"]').length).toEqual(2)
    // })

    // it('Displays passage\'s lifespan', () => {
    //     expect(wrapper.find('[data-testid="passage-book"]').length).toEqual(2)
    // })
})