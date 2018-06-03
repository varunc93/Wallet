import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import LoginPage from "../../components/LoginPage";

test("LoginPage should render correctly", () => {
    const wrapper = <LoginPage />
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test ("Should call start login", () => {
    const startLogin = jest.fn();
    const wrapper = shallow(<LoginPage startLogin={startLogin} />);
    wrapper.find('button').simulate('click');
    expect(startLogin).toHaveBeenCalled();
});