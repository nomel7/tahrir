'use strict';

import React from 'react';
import Reflux from 'reflux';
import App from '../../../../src/main/js/components/app'
import Actions from '../../../../src/main/js/actions/tahrir-api-actions'
import TahrirStore from '../../../../src/main/js/stores/tahrir-api-store';
import {render, act} from '../test-utils';

describe('App', () => {
    let container;
    let store;

    beforeEach(() => {
        spyOn(Actions, 'getIdentity');
        store = Reflux.initStore(TahrirStore);
        store.setState({identity: {nickname: null}});
        ({container} = render(<App />));
    });

    it('updates the identity', () => {
        expect(Actions.getIdentity).toHaveBeenCalled();
    });

    it('renders the login window', () => {
        expect(container.querySelector('form')).not.toBeNull();
        expect(container.querySelector('header')).toBeNull();
    });

    describe('when the user is Default', () => {
        beforeEach(() => {
            act(() => {
                store.setState({identity: {nickname: 'Default'}});
            });
        });

        it('renders the login window', () => {
            expect(container.querySelector('form')).not.toBeNull();
        });
    });

    describe('when the user is logged in', () => {
        beforeEach(() => {
            act(() => {
                store.setState({identity: {nickname: '@nomel7'}});
            });
        });

        it('renders the navigator', () => {
            expect(container.querySelector('header')).not.toBeNull();
        });
    });

});
