import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses'

export const ExpenseList = (props) => ( //Export required for testing to isolate ExpenseList and use custom expenses
    <div>
        {
            props.expenses.length === 0 ? (
                <p>There are no expenses to show!</p>
            ):
            (
                props.expenses.map((expense) => {
                    return <ExpenseListItem key={expense.id} {...expense} />;
            }))
        }
    </div>
);

const mapStateToProps = (state) => {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filters)
    };
}

//Same as
// const mapStateToProps = (state) => ({
//     expenses: state.expenses,
//     filters: state.filters
// });


export default connect(mapStateToProps)(ExpenseList); //Connect returns a function