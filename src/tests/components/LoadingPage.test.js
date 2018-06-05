import React from 'react';
import {shallow} from 'enzyme';
import LoadingPage from '../../components/LoadingPage';

test('Render LoadingPage correctly', () => {
    const wrapper = shallow(<LoadingPage />);
    expenct(toJSON(wrapper)).toMatchSnapshot();
});