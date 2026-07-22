'use strict';

import React from 'react';
import PostForm from '../../../main/js/components/post-form';
import Actions from '../../../main/js/actions/tahrir-api-actions';
import {render, fireEvent} from '../test-utils';

describe('PostForm', () => {
    let container;

    beforeEach(() => {
        ({container} = render(<PostForm />));
    });

    it('renders the form', () => {
        expect(container.querySelectorAll('input').length).toBe(1);
    });

    it('renders the button', () => {
        expect(container.querySelectorAll('button').length).toBe(1);
    });

    describe('when the post button is clicked', () => {
        const message = 'This is a message';

        beforeEach(() => {
            spyOn(Actions, 'postBroadcastMessage');
            fireEvent.change(container.querySelector('input'), {target: {value: message}});
            fireEvent.click(container.querySelector('button'));
        });

        it('posts a message with the text area contents', () => {
            expect(Actions.postBroadcastMessage).toHaveBeenCalledWith(message);
        });

        it('clears the textarea', () => {
            expect(container.querySelector('input').value).toBe('');
        });
    });


});
