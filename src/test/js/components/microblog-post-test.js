'use strict';

import UIActions from '../../../main/js/actions/tahrir-ui-actions';
import React from 'react';
import MicroblogPost from '../../../main/js/components/microblog-post';
import {mount} from '../enzyme-adapter';

describe('MicroblogPost', () => {
    let wrapper;

    beforeEach(() => {
        const props = {message: 'This is the first message', nickname: 'nomel7', timeCreated: new Date(Date.now() - 60 * 1000)};
        wrapper = mount(<MicroblogPost {...props} />);
    });

    it('renders the microblog messages', () => {
        const wrappedMessages = wrapper.find('.microblog-message');
        expect(wrappedMessages.length).toBe(1);
        expect(wrappedMessages.text()).toEqual('This is the first message');
    });

    it('renders the nicknames', () => {
        const wrappedNicknames = wrapper.find('.microblog-nickname');
        expect(wrappedNicknames.length).toBe(1);
        expect(wrappedNicknames.text()).toEqual('nomel7');
    });

    it('renders the timestamps', () => {
        const wrappedTimestamps = wrapper.find('.microblog-timestamp');
        expect(wrappedTimestamps.length).toBe(1);
        expect(wrappedTimestamps.text()).toEqual('1m');
    });

    describe('when a nickname is clicked', () => {
        beforeEach(() => {
            spyOn(UIActions, 'updateAuthorPage');
            wrapper.find('.microblog-nickname').simulate('click');
        });

        it('displays the microblog author page', () => {
            expect(UIActions.updateAuthorPage).toHaveBeenCalled();
        });
    });
});

