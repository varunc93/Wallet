import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';
import toJSON from 'enzyme-to-json';

let startAddExpense, history, wrapper;

beforeEach(() => {
    startAddExpense = jest.fn();
    history = {push: jest.fn()};
    wrapper = shallow(<AddExpensePage  startAddExpense={startAddExpense} history={history}/>);
});

test("Render AddExpense Correctly", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Handle AddExpense onSubmit", () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[2]);
    expect(history.push).toHaveBeenLastCalledWith("/");
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[2]);
    expect(toJSON(wrapper)).toMatchSnapshot();
});