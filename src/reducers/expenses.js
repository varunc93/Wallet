//Expense Reducer

const expenseReducerDefault = [];

const expenseReducer = (state = expenseReducerDefault, action) => {
    switch(action.type){
        case "ADD_EXPENSE":
            return [...state, action.expense];                //Using spread operator does not change the existing array.
        case "REMOVE_EXPENSE":
            return state.filter(({id}) =>  id !== action.id);
        case "EDIT_EXPENSE":
            return state.map((expense) => {
                if (expense.id === action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense;
                }
            });
        case 'SET_EXPENSES':
            return action.expenses;
        default: return state;
    }
};

export default expenseReducer;