'use strict';

import React from 'react';
import {mount} from '../enzyme-adapter';
import App from '../../../../src/main/js/components/app'
import Actions from '../../../../src/main/js/actions/tahrir-api-actions'

describe('App', () => {
    let wrapper;

    beforeEach(() => {
        spyOn(Actions, 'getIdentity');
        wrapper = mount(<App />);
    });

    it('updates the identity', () => {
        expect(Actions.getIdentity).toHaveBeenCalled();
    });

    it('renders the login window', () => {
        expect(wrapper.find('Login').length).toBe(1);
    });

    describe('when the user is Default', () => {
        beforeEach(() => {
            wrapper.setState({identity: {nickname: 'Default'}});
        });

        it('renders the login window', () => {
            expect(wrapper.find('Login').length).toBe(1);
        });
    });

    describe('when the user is logged in', () => {
        beforeEach(() => {
            wrapper.setState({identity: {nickname: '@nomel7'}});
        });

        it('renders the navigator', () => {
            expect(wrapper.find('Navigator').length).toBe(1);
        });
    });

});

