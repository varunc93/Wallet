import React from 'react';
import {connect} from 'react-redux';
import ExpenseListItem from './ExpenseListItem'
import getVisibleExpenses from '../selectors/expenses'

export const ExpenseList = (props) => ( //Export required for testing to isolate ExpenseList and use custom expenses
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>There are no expenses to show!</span>
                    </div>
                ):
                (
                    props.expenses.map((expense) => {
                        return <ExpenseListItem key={expense.id} {...expense} />;
                }))
            }
        </div>
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