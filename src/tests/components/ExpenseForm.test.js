import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test("Return expenseform default", () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Return expenseform with values", () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[0]}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Render error for invalid form submission", () => {
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}            //Since we've used event.preventDefault
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0); //Allows us to access the state variables, here the error
    //should be raised.
    expect(toJSON(wrapper)).toMatchSnapshot();
});


test("Render set description on input change", () => {
    const value = "New description";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(0).simulate('change', { //at(0) chooses description
        target: {value}
    });
    expect(wrapper.state('description')).toBe(value);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Render text area on input change",() => {
    const value = "New text";
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change', {
        target: {value}
    });
    expect(wrapper.state('text')).toBe(value)
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Render amount on input change",() => {
    const value = '12.33';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Not render amount on input change",() => {
    const value = '12.333';
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change', {
        target: {value}
    });
    expect(wrapper.state('amount')).toBe("");
    expect(toJSON(wrapper)).toMatchSnapshot();
});

//mock functions are also called spies

test("Render onSubmit form on valid submission", () => {
    const onSubmitSpy = jest.fn(); //Returns a new spy
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} onSubmit={onSubmitSpy}/>);
    //expect(onSubmitSpy).toHaveBeenCalled(); //Will throw an error if spy was never called
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}            //Since we've used event.preventDefault
    });
    expect(wrapper.state("error")).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        description: expenses[1].description,
        text: expenses[1].text,
        amount: expenses[1].amount,
        createdAt: expenses[1].createdAt
    });
});

test("Render new date or change date", () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('[onDateChange]').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test("Render focus change", () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('[onFocusChange]').prop('onFocusChange')({ focused });
    expect(wrapper.state('focused')).toBe(focused);
  });