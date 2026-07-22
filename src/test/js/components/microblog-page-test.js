'use strict';

import APIActions from '../../../main/js/actions/tahrir-api-actions';
import UIActions from '../../../main/js/actions/tahrir-ui-actions';
import React from 'react';
import MicroblogPage from '../../../main/js/components/microblog-page';
import {mount} from '../enzyme-adapter';

describe('MicroblogPage', () => {
    let wrapper;

    beforeEach(() => {
        spyOn(APIActions, 'listBroadcastMessages');
        wrapper = mount(<MicroblogPage name={"John"} />);
        wrapper.setState({microblogs: [
            {message: 'This is the first message', nickname: 'nomel7', timeCreated: new Date().getTime()},
            {message: 'This is the second message', nickname: 'sanity', timeCreated: new Date(Date.now() - 60 * 1000).getTime()},
            {message: 'This is the third message', nickname: 'Default', timeCreated: new Date(Date.now() - 2 * 60 * 60 * 1000).getTime()}
        ]});
    });

    it('calls the listBroadcastMessages API', () => {
       expect(APIActions.listBroadcastMessages).toHaveBeenCalled();
    });

    it('renders the post form', () => {
        expect(wrapper.find('PostForm').length).toBe(1);
    });

    it('renders the header', () => {
        expect(wrapper.find('.microblog-page-name').length).toBe(1);
        expect(wrapper.find('.microblog-page-name').at(0).text()).toBe("John");
    });

    it('renders the microblog messages', () => {
        const wrappedMessages = wrapper.find('.microblog-message');
        expect(wrappedMessages.length).toBe(3);
        expect(wrappedMessages.at(0).text()).toEqual('This is the first message');
        expect(wrappedMessages.at(1).text()).toEqual('This is the second message');
        expect(wrappedMessages.at(2).text()).toEqual('This is the third message');
    });

    it('renders the nicknames', () => {
        const wrappedNicknames = wrapper.find('.microblog-nickname');
        expect(wrappedNicknames.length).toBe(3);
        expect(wrappedNicknames.at(0).text()).toEqual('nomel7');
        expect(wrappedNicknames.at(1).text()).toEqual('sanity');
        expect(wrappedNicknames.at(2).text()).toEqual('Default');
    });


    it('renders the timestamps', () => {
        const wrappedTimestamps = wrapper.find('.microblog-timestamp');
        expect(wrappedTimestamps.length).toBe(3);
        expect(wrappedTimestamps.at(0).text()).toEqual('0s');
        expect(wrappedTimestamps.at(1).text()).toEqual('1m');
        expect(wrappedTimestamps.at(2).text()).toEqual('2h');
    });

    describe('when there is a filter', () => {
        beforeEach(() => {
            const filter = microblog => {
                return microblog.nickname === 'nomel7';
            };
            wrapper.setProps({filter});
        });

        it('only renders the microblogs for that filter', () => {
            const wrappedMessages = wrapper.find('.microblog-message');
            expect(wrappedMessages.length).toBe(1);
            expect(wrappedMessages.at(0).text()).toEqual('This is the first message');
        });
    });

    describe('when a nickname is clicked', () => {
        beforeEach(() => {
            spyOn(UIActions, 'updateAuthorPage');
            wrapper.find('.microblog-nickname').first().simulate('click');
        });

        it('displays the microblog author page', () => {
            expect(UIActions.updateAuthorPage).toHaveBeenCalled();
        });
    });
});

