import React from 'react'
import {shallow} from 'enzyme'

import Main from '../../../../../../components/maria/blog/indexPage/Main'
import styles from '../../../../../../styles/Blog.module.css'

describe('IndexPage Main', () => {

    const blogPosts = [
        {_id: '1', title: '', subtitle: '', content: '', releaseDate: '01-01-2021', keyWords: []},
        {_id: '2', title: '', subtitle: '', content: '', releaseDate: '01-01-2021', keyWords: []},
        {_id: '3', title: '', subtitle: '', content: '', releaseDate: '01-01-2021', keyWords: []}
    ]

    const wrapper = shallow(<Main posts={blogPosts} />)

    it('Displays three blog posts', () => {
        expect(wrapper.find('[data-testid="post-container"]').length).toEqual(3)
    })
})