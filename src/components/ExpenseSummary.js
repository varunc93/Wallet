import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({expenseCount, expensesTotal}) => {
    const expenseWord = expenseCount === 1 ? "expense" : "expenses";
    const formattedExpense = numeral(expensesTotal/100).format("$0,0.00");
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page_header__title">Viewing a total of <span>{formattedExpense}</span> for <span>{expenseCount}</span> {expenseWord}. </h1>
                <div className="page-header__actions">
                    <Link className="button" to="/create">Add New Expense</Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state) => {
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: selectExpensesTotal(visibleExpenses)
    }
};

export default connect(mapStateToProps)(ExpenseSummary);