'use strict';

import React from 'react';
import Reflux from 'reflux';
import Navigator from '../../../../src/main/js/components/navigator'
import TahrirStore from '../../../../src/main/js/stores/tahrir-api-store';
import {render, fireEvent, act, screen} from '../test-utils';

describe('Navigator', () => {
    let container;
    let store;

    beforeEach(() => {
        store = Reflux.initStore(TahrirStore);
        act(() => {
            store.setState({identity: {nickname: '@nomel7'}});
        });
        ({container} = render(<Navigator />));
    });

    it('renders the sidebar brand', () => {
       expect(container.querySelectorAll('.sidebar').length).toBe(1);
       expect(container.querySelector('.sidebar-title').textContent).toBe('Tahrir');
    });

    it('renders the navigation items', () => {
        expect(screen.getByText('All')).not.toBeNull();
        expect(screen.getByText('Following')).not.toBeNull();
        expect(screen.getByText('Mentions')).not.toBeNull();
    });

    it('shows the all feed by default', () => {
        expect(container.querySelector('.microblog-page-name').textContent).toBe('Feed for @nomel7');
    });

    describe('when mentions is clicked', () => {
        beforeEach(() => {
            fireEvent.click(screen.getByText('Mentions'));
        });

        it('updates the microblog page to mentions', () => {
            expect(container.querySelector('.microblog-page-name').textContent).toBe('Mentions for @nomel7');
        });
    });

});
