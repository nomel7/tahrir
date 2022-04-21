'use strict';

import React from 'react';
import {shallow} from '../enzyme-adapter';
import Navigator from '../../../../src/main/js/components/navigator'
import {mentionsFilter} from '../../../main/js/helpers/microblog-filter'

describe('Navigator', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Navigator />);
        wrapper.setState({identity: {nickname: '@nomel7'}});
    });

    it('renders the header', () => {
       expect(wrapper.find('header').length).toBe(1);
       expect(wrapper.find('h1').length).toBe(1);
    });

    it('renders the navigation items', () => {
        expect(wrapper.find('NavItem').children().contains('All')).toBe(true);
        expect(wrapper.find('NavItem').children().contains('Following')).toBe(true);
        expect(wrapper.find('NavItem').children().contains('Mentions')).toBe(true);
    });

    it('shows the all selected by default', () => {
        expect(wrapper.find('Nav').prop('activeKey')).toBe(1);
    });

    it('shows the default microblog page', () => {
        expect(wrapper.find('MicroblogPage').prop('filter')).toBeUndefined();
    });

    describe('when mentions is clicked', () => {
        beforeEach(() => {
            wrapper.find('Nav').simulate('select', 3);
        });

        it('updates the mentions nav item as selected', () => {
            expect(wrapper.find('Nav').prop('activeKey')).toBe(3);
        });

        it('updates the microblog page', () => {
            const filter = mentionsFilter('@nomel7');
            expect(wrapper.find('MicroblogPage').prop('filter').toString()).toEqual(filter.toString());
        });

    });

});

