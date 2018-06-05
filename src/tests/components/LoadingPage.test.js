import React from 'react';
import {shallow} from 'enzyme';
import LoadingPage from '../../components/LoadingPage';
import toJSON from 'enzyme-to-json';

test('Render LoadingPage correctly', () => {
    const wrapper = shallow(<LoadingPage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});