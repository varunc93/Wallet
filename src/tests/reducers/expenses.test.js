import expenses from '../fixtures/expenses';
import expenseReducer from "../../reducers/expenses";

test ("Set default expense reducers", () => {
    const state = expenseReducer(undefined, {type: "@@INIT"});
    expect(state).toEqual([]);
});

test ("Remove expense by Id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: expenses[1].id
    };
    const state = expenseReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test ("Should not remove expense by wrong Id", () => {
    const action = {
        type: "REMOVE_EXPENSE",
        id: "ABC"
    };
    const state = expenseReducer(expenses, action)
    expect(state).toEqual([expenses[0], expenses[1], expenses[2]]);
});

test ("Add expense by Id", () => {
    const expense = {
        id: '4',
        description: 'D',
        text: 'Dtext',
        createdAt: 123456,
        amount: 24000
    };
    const action = {
        type: "ADD_EXPENSE",
        expense
    };
    const state = expenseReducer(expenses, action);
    expect(state).toEqual([...expenses, expense]);
});

test ("Edit expense by Id", () => {
    const amount = 10000
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expenseReducer(expenses, action);
    expect(state[1].amount).toBe(amount);
});

test ("Should not edit expense by Id", () => {
    const amount = 10000
    const action = {
        type: 'EDIT_EXPENSE',
        id: 'ABC',
        updates: {
            amount
        }
    };
    const state = expenseReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = {
      type: 'SET_EXPENSES',
      expenses: [expenses[1]]
    };
    const state = expenseReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
  });



