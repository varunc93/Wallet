import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import LoginPage from "../../components/LoginPage";

test("LoginPage should render correctly", () => {
    const wrapper = <LoginPage />
    expect(toJSON(wrapper)).toMatchSnapshot();
});