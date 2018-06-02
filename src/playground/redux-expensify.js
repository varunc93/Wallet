import {createStore, combineReducers} from 'redux';
import uuid from 'uuid';

//Action Generators

//Expenses

const addExpense = ({description = 'text', note = 'text', amount = 0, createdAt = 0} = {}) => ({
    type: "ADD_EXPENSE",
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

const removeExpense = ({id} = {}) => ({
    type: "REMOVE_EXPENSE",
    expense: {id}
});

const editExpense = (id, updates) => ({   //another way of passing id
    type: "EDIT_EXPENSE",
    id,
    updates
})

//Filters

const setTextFilter = (text = '') => ({
    type: "SET_TEXT_FILTER",
    text
});

const sortByAmount = (sortBy = "amount") => ({
    type: "SORT_BY_AMOUNT",
    sortBy
});

const sortByDate = (sortBy = "date") => ({
    type: "SORT_BY_DATE",
    sortBy
});

const setStartDate = (startDate) => ({
    type: "SET_START_DATE",
    startDate
});

const setEndDate = (endDate) => ({
    type: "SET_END_DATE",
    endDate
});

//startDate and endDate are timestamps
//They can be either negative or positive and are measured in milliseconds
//0 refers to January 1st (midnight), 1970 (unix epoch)
//Function to combine expenses and filters

//Selectors

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {  //de-structure filters
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
        const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());
        return textMatch && startDateMatch && endDateMatch;
    }).sort((a,b) => {
        if(sortBy.toLowerCase() === "date")
            return a.createdAt < b.createdAt ? 1 : -1;  //Print the most recent expense first, if a is created first, then print a last.
        else if(sortBy.toLowerCase() === "amount")
            return a.amount - b.amount < 0 ? 1 : -1; //Print higher amount first
        else
            return 0;
    });
};

//Expense Reducer

const expenseReducerDefault = [];
const expenseReducer = (state = expenseReducerDefault, action) => {
    switch(action.type){
        case "ADD_EXPENSE":
            return [...state, action.expense];                //Using spread operator does not change the existing array.
        case "REMOVE_EXPENSE":
            return state.filter(({id}) =>  id !== action.expense.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if(action.id === expense.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else {
                    return expense;
                }
            });
        default: return state;
    }
};

//Filters Reducer

const filtersReducerDefault = {text:'text', sortBy:"date", startDate: undefined, endDate: undefined};
const filtersReducer = (state = filtersReducerDefault, action) => {
    switch(action.type){
        case "SET_TEXT_FILTER":
            return {
                    ...state,
                    text: action.text
                };
        case "SORT_BY_AMOUNT":
                return {
                    ...state,
                    sortBy: action.sortBy
                };
        case "SORT_BY_DATE":
                return {
                    ...state,
                    sortBy: action.sortBy
                };
        case "SET_START_DATE":
                return {
                    ...state,
                    startDate: action.startDate
                }
        case "SET_END_DATE":
                return {
                    ...state,
                    endDate: action.endDate
                }
        default: return state;
    }
};

//Store creation

const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filtersReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: 'final',
    note: 'final',
    amount: 10000,
    createdAt: 1000
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'final2',
    note: 'final2',
    amount: 20000,
    createdAt: -1000
}));

// store.dispatch(removeExpense({
//     id: expenseTwo.expense.id
// }));

// store.dispatch(editExpense( expenseOne.expense.id, { //We pass in the id to edit, followed by the values that are being edited
//     amount: 500
// }));

store.dispatch(setTextFilter("final"));

// store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(125));

// store.dispatch(setEndDate(135));

const demoState = {
    expenses: [{
        id: 'id',
        description: 'description',
        note: 'note',
        amount: 1234500,
        createdAt: 0
    }],
    filters: {
        text: 'Rent',
        sortBy: 'date or amount',
        startDate: undefined,
        endDate: undefined
    }
};

//Spread operator for object
//const user = {
//     name: 'name',
//     age: 23
// };

// console.log({...user, location:'City', age: 26}); //We can add new property as well, values can be overridden as well, age is overridden here.
//However to override the variable, we must call it after defining user.