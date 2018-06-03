import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import DashboardPage from '../../components/DashBoardPage';

test("Return DashBoardPage", () => {
    const wrapper = shallow(<DashboardPage />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});