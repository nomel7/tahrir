'use strict';

import React from 'react';
import PostForm from '../../../main/js/components/post-form';
import Actions from '../../../main/js/actions/tahrir-api-actions';
import {mount} from '../enzyme-adapter';

describe('PostForm', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<PostForm />);
    });

    it('renders the form', () => {
        expect(wrapper.find('input').length).toBe(1);
    });

    it('renders the button', () => {
        expect(wrapper.find('button').length).toBe(1);
    });

    describe('when the post button is clicked', () => {
        const message = 'This is a message';

        beforeEach(() => {
            spyOn(Actions, 'postBroadcastMessage');
            const textArea = wrapper.find('input');
            textArea.simulate('change', {target: {value: message}});

            wrapper.find('button').simulate('click');
        });

        it('posts a message with the text area contents', () => {
            expect(Actions.postBroadcastMessage).toHaveBeenCalledWith(message);
        });

        it('clears the textarea', () => {
            const textArea = wrapper.find('input');
            expect(textArea.props().value).toBe('');
        });
    });


});
