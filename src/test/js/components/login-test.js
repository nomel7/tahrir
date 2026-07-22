'use strict';

import Actions from '../../../main/js/actions/tahrir-api-actions';
import React from 'react';
import Login from '../../../../src/main/js/components/login'
import {render, fireEvent} from '../test-utils';

describe('Login', () => {
    let container;

    beforeEach(() => {
        ({container} = render(<Login />));
    });

    it('renders create new user input', () => {
        expect(container.querySelectorAll('input').length).toBe(1);
    });

    it('renders create new user button', () => {
        expect(container.querySelectorAll('button').length).toBe(1);
    });

    describe('when the create new user button is clicked', () => {
        const nickname = '@nomel7';

        beforeEach(() => {
            spyOn(Actions, 'postIdentity');
            fireEvent.change(container.querySelector('input'), {target: {value: nickname}});
            fireEvent.click(container.querySelector('button'));
        });

        it('creates a new user', () => {
             expect(Actions.postIdentity).toHaveBeenCalledWith({nickname})
        });
    });
});
