import React from 'react';
import { shallow } from 'enzyme';
import expenses from '../fixtures/expenses';
import { EditExpensePage } from '../../components/EditExpensePage';

let editExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  editExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
      expense={expenses[1]}
    />
  );
});

test('Render EditExpensePage', () => {
    expect(wrapper).toMatchSnapshot();
});

test('Handle editExpense', () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expenses[1]);
    expect(history.push).toHaveBeenCalledLastWith("/");
    expect(editExpense).toHaveBeenCalledLastWith(expenses[1].id, expenses[1]);
});

test('Handle startRemoveExpense', () => {
    wrapper.find("button").simulate("click");
    expect(history.push).toHaveBeenCalledLastWith("/");
    expect(startRemoveExpense).toHaveBeenCalledLastWith({id: expense[1].id});
});

