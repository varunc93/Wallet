import uuid from 'uuid';

//Action Generators

//Expenses

export const addExpense = ({description = '', text = '', amount = 0, createdAt = 0} = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        text,
        amount,
        createdAt
    }
});

export const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

export const editExpense = (id, updates) => ({   //another way of passing id
    type: "EDIT_EXPENSE",
    id,
    updates
});