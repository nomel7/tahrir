'use strict';

import Actions from '../../../main/js/actions/tahrir-api-actions';
import React from 'react';
import Login from '../../../../src/main/js/components/login'
import Button from "react-bootstrap/Button";
import {mount} from '../enzyme-adapter';

describe('Login', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Login />);
    });

    it('renders create new user input', () => {
        expect(wrapper.find('FormControl').length).toBe(1);
    });

    it('renders create new user button', () => {
        expect(wrapper.find('Button').length).toBe(1);
    });

    describe('when the create new user button is clicked', () => {
        const nickname = '@nomel7';

        beforeEach(() => {
            spyOn(Actions, 'postIdentity');
            const input = wrapper.find('input');
            input.simulate('change', {target: {value: nickname}});
            wrapper.find('button').simulate('click');
        });

        it('creates a new user', () => {
             expect(Actions.postIdentity).toHaveBeenCalledWith({nickname})
        });
    });
});


