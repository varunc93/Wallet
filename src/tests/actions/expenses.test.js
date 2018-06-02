import {addExpense, removeExpense, editExpense } from "../../actions/expenses"

test("should setup remove expense object", () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: '123abc'
    }); //toBe uses === to compare and that will fail for objects
});

test("should setup edit expense object", () => {
    const action = editExpense('123abc', { text: 'New note'});
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: '123abc',
        updates: {
            text: "New note"
        }
    });
});

test("should setup add expense object default",() => {
    const action = addExpense();
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            description: '',
            text: '',
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});


test("should setup add expense object default",() => {
    const expenseData = {description: '123', text: 'text', amount: 10000, createdAt: 12345};
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

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