import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense, addExpense, removeExpense, startRemoveExpense, editExpense, startEditExpense, setExpenses, startSetExpenses } from "../../actions/expenses";
import expenses from "../fixtures/expenses";
import database from '../../firebase/firebase';

const uid = "123abc";
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({id, description, text, amount, createdAt}) => {
        expenses[id] = {description, text, amount, createdAt};
    });
    database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

test("should setup remove expense object", () => {
    const action = removeExpense(expenses[0].id);
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: expenses[0].id
    }); //toBe uses === to compare and that will fail for objects
});


test("should remove expense from firebase", (done) => {
    const store = createMockStore({auth: {uid}});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense(id)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value' );
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test("should setup edit expense object", () => {
    const action = editExpense(expenses[1].id, { text: 'New note'});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: expenses[1].id,
        updates: {
            text: "New note"
        }
    });
});

test("should edit expense from firebase", (done) => {
    const store = createMockStore({auth: {uid}});
    const id = expenses[0].id;
    const updates = {amount: 21000};
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

test("should setup add expense object default",() => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test("should add expense to database and store", (done) => {//done is used for asynchronous functions to make jest wait till done is called to pass/fail the test case.
    const store = createMockStore({auth: {uid}});//jest by default doesn't wait for asynchronous and will run as is.
    const expenseData = {
        description: "Mouse",
        amount: 3000,
        text: "This one is better",
        createdAt: 1000
    };
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        return database.ref(`users/${uid}/expense/${action[0].expense.id}`).once('value');
    }).then((snapshot) =>{
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});


test("should add expense to database and store", (done) => {
    const store = createMockStore({auth: {uid}});
    const expenseDefault = {
        description: "",
        amount: 0,
        text: "",
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefault
            }
        });
        return database.ref(`users/${uid}/expense/${action[0].expense.id}`).once('value');
    }).then((snapshot) =>{
        expect(snapshot.val()).toEqual(expenseDefault);
        done();
    });
});


test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({auth: {uid}});
    store.dispatch(startSetExpenses()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_EXPENSES',
        expenses
      });
      done();
    });
});

// test("should setup add expense object default",() => {
//     const expenseData = {description: '123', text: 'text', amount: 10000, createdAt: 12345};
//     const action = addExpense(expenseData);
//     expect(action).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             ...expenseData,
//             id: expect.any(String)
//         }
//     });
// });

//OR
// test("should setup add expense object default",() => {
//     const action = addExpense({description: '123', text: 'text', amount: 10000, createdAt: 12345});
//     expect(action).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             description: '123',
//             text: 'text',
//             amount: 10000,
//             createdAt: 12345,
//             id: expect.any(String)
//         }
//     });
// });