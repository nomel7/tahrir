'use strict';

import APIActions from '../../../main/js/actions/tahrir-api-actions';
import UIActions from '../../../main/js/actions/tahrir-ui-actions';
import React from 'react';
import Reflux from 'reflux';
import MicroblogPage from '../../../main/js/components/microblog-page';
import TahrirAPIStore from '../../../main/js/stores/tahrir-api-store';
import {render, fireEvent, act} from '../test-utils';

describe('MicroblogPage', () => {
    let container;
    let rerender;
    let store;

    beforeEach(() => {
        spyOn(APIActions, 'listBroadcastMessages');
        store = Reflux.initStore(TahrirAPIStore);
        ({container, rerender} = render(<MicroblogPage name={"John"} />));
        act(() => {
            store.setState({microblogs: [
                {message: 'This is the first message', nickname: 'nomel7', timeCreated: new Date().getTime()},
                {message: 'This is the second message', nickname: 'sanity', timeCreated: new Date(Date.now() - 60 * 1000).getTime()},
                {message: 'This is the third message', nickname: 'Default', timeCreated: new Date(Date.now() - 2 * 60 * 60 * 1000).getTime()}
            ]});
        });
    });

    it('calls the listBroadcastMessages API', () => {
       expect(APIActions.listBroadcastMessages).toHaveBeenCalled();
    });

    it('renders the post form', () => {
        expect(container.querySelectorAll('.post-form').length).toBe(1);
    });

    it('renders the header', () => {
        const header = container.querySelectorAll('.microblog-page-name');
        expect(header.length).toBe(1);
        expect(header[0].textContent).toBe("John");
    });

    it('renders the microblog messages', () => {
        const wrappedMessages = container.querySelectorAll('.microblog-message');
        expect(wrappedMessages.length).toBe(3);
        expect(wrappedMessages[0].textContent).toEqual('This is the first message');
        expect(wrappedMessages[1].textContent).toEqual('This is the second message');
        expect(wrappedMessages[2].textContent).toEqual('This is the third message');
    });

    it('renders the nicknames', () => {
        const wrappedNicknames = container.querySelectorAll('.microblog-nickname');
        expect(wrappedNicknames.length).toBe(3);
        expect(wrappedNicknames[0].textContent).toEqual('nomel7');
        expect(wrappedNicknames[1].textContent).toEqual('sanity');
        expect(wrappedNicknames[2].textContent).toEqual('Default');
    });


    it('renders the timestamps', () => {
        const wrappedTimestamps = container.querySelectorAll('.microblog-timestamp');
        expect(wrappedTimestamps.length).toBe(3);
        expect(wrappedTimestamps[0].textContent).toEqual('0s');
        expect(wrappedTimestamps[1].textContent).toEqual('1m');
        expect(wrappedTimestamps[2].textContent).toEqual('2h');
    });

    describe('when there is a filter', () => {
        beforeEach(() => {
            const filter = microblog => {
                return microblog.nickname === 'nomel7';
            };
            act(() => {
                rerender(<MicroblogPage name={"John"} filter={filter} />);
            });
        });

        it('only renders the microblogs for that filter', () => {
            const wrappedMessages = container.querySelectorAll('.microblog-message');
            expect(wrappedMessages.length).toBe(1);
            expect(wrappedMessages[0].textContent).toEqual('This is the first message');
        });
    });

    describe('when a nickname is clicked', () => {
        beforeEach(() => {
            spyOn(UIActions, 'updateAuthorPage');
            fireEvent.click(container.querySelectorAll('.microblog-nickname')[0]);
        });

        it('displays the microblog author page', () => {
            expect(UIActions.updateAuthorPage).toHaveBeenCalled();
        });
    });
});
