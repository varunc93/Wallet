import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startEditExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
    startEditExpense={startEditExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[1]}
    />
  );
});

test('Render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Handle startEditExpense', () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(history.push).toHaveBeenCalledLastWith("/");
    expect(startEditExpense).toHaveBeenCalledLastWith(expenses[1].id, expenses[1]);
});

test('Handle startRemoveExpense', () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenCalledLastWith("/");
    expect(startRemoveExpense).toHaveBeenCalledLastWith({id: expense[1].id});
});

