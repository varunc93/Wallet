import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PageNotFound from '../../components/PageNotFound'

test("Return DahBoardPage", () => {
    const wrapper = shallow(<PageNotFound />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});