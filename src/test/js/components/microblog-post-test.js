'use strict';

import UIActions from '../../../main/js/actions/tahrir-ui-actions';
import React from 'react';
import MicroblogPost from '../../../main/js/components/microblog-post';
import {render, fireEvent} from '../test-utils';

describe('MicroblogPost', () => {
    let container;

    beforeEach(() => {
        const props = {message: 'This is the first message', nickname: 'nomel7', timeCreated: new Date(Date.now() - 60 * 1000)};
        ({container} = render(<MicroblogPost {...props} />));
    });

    it('renders the microblog messages', () => {
        const wrappedMessages = container.querySelectorAll('.microblog-message');
        expect(wrappedMessages.length).toBe(1);
        expect(wrappedMessages[0].textContent).toEqual('This is the first message');
    });

    it('renders the nicknames', () => {
        const wrappedNicknames = container.querySelectorAll('.microblog-nickname');
        expect(wrappedNicknames.length).toBe(1);
        expect(wrappedNicknames[0].textContent).toEqual('nomel7');
    });

    it('renders the timestamps', () => {
        const wrappedTimestamps = container.querySelectorAll('.microblog-timestamp');
        expect(wrappedTimestamps.length).toBe(1);
        expect(wrappedTimestamps[0].textContent).toEqual('1m');
    });

    describe('when a nickname is clicked', () => {
        beforeEach(() => {
            spyOn(UIActions, 'updateAuthorPage');
            fireEvent.click(container.querySelector('.microblog-nickname'));
        });

        it('displays the microblog author page', () => {
            expect(UIActions.updateAuthorPage).toHaveBeenCalled();
        });
    });
});
