'use strict';

import React from 'react';
import {mount} from '../enzyme-adapter';
import MicroblogAuthorPage from '../../../../src/main/js/components/microblog-author-page';

describe('MicroblogAuthorPage', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<MicroblogAuthorPage />);
    });

    it('hides the modal by default', () => {
        expect(wrapper.find('Modal').first().props().show).toBe(false);
    });

    describe('when the author is set', () => {
        beforeEach(() => {
            wrapper.setState({authorPage: {nickname: '@nomel7'}});
        });

        it('shows the modal', () => {
            expect(wrapper.find('Modal').first().props().show).toBe(true);
        });
    });

});

