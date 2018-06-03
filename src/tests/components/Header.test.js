//react-test-renderer
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
// import ReactShallowRenderer from 'react-test-renderer/shallow';
import { Header } from '../../components/Header'


test('Render Header Correctly', () => {
    //React test renderer
    // const renderer = new ReactShallowRenderer();
    // renderer.render(<Header />);
    // expect(renderer.getRenderOutput()).toMatchSnapshot();

    //Enzyme
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test ("Should call start logout", () => {
    const startLogout = jest.fn();
    const wrapper = shallow(<Header startLogout={startLogout}/>);
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
});

test ("Should call start logout", () => {

});