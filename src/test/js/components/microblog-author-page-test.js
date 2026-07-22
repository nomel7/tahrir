'use strict';

import React from 'react';
import Reflux from 'reflux';
import MicroblogAuthorPage from '../../../../src/main/js/components/microblog-author-page';
import TahrirUIStore from '../../../../src/main/js/stores/tahrir-ui-store';
import {render, act, screen} from '../test-utils';

describe('MicroblogAuthorPage', () => {
    let store;

    beforeEach(() => {
        store = Reflux.initStore(TahrirUIStore);
        store.setState({authorPage: {nickname: null}});
        render(<MicroblogAuthorPage />);
    });

    it('hides the modal by default', () => {
        expect(screen.queryByText(/has made/)).toBeNull();
    });

    describe('when the author is set', () => {
        beforeEach(() => {
            act(() => {
                store.setState({authorPage: {nickname: '@nomel7'}});
            });
        });

        it('shows the modal', () => {
            expect(screen.getByText('Posts @nomel7 has made')).not.toBeNull();
        });
    });

});
