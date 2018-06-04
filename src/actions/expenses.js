import uuid from 'uuid';
import database from '../firebase/firebase';

//Action Generators

//Expenses

export const addExpense = (expense) => ({
    type: "ADD_EXPENSE",
    expense
});

export const startAddExpense = (expenseData = {}) => {  //This returning of a function is allowed since we used middleware thunk,else we have to return an object
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        const {
            description = '',
            text = '',
            amount = 0,
            createdAt = 0
        } = expenseData; //another way of declaring default values
        const expense = {description, text, amount, createdAt};

        return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => { //data is returned for promise chaining in the test case
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }));
        });
    };
};

export const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    id
});

export const startRemoveExpense = ({id} = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).remove().then(() => {
            dispatch(removeExpense({id}));
        });
    }
}

export const editExpense = (id, updates) => ({   //another way of passing id
    type: "EDIT_EXPENSE",
    id,
    updates
});

export const startEditExpense = (id, updates) => {
    return(dispatch, getState) => { //dispatch is passed so that we have access to it below
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => {
            dispatch(editExpense(id, updates));
        });
    }
}

export const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

export const startSetExpenses = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return database.ref(`users/${uid}/expenses`).once('value').then((snapshot) => {
            const expenses = [];

            snapshot.forEach((childSnapshot) => {
                expenses.push({
                    id: childSnapshot.key,
                    ...childSnapshot.val()
                });
            });
            dispatch(setExpenses(expenses));
        });
    };
};