import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {startAddExpense} from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        this.props.startAddExpense(expense);
        this.props.history.push("/"); //push takes in a path to reroute to a stored path
    };

    render() {
        return (
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Add Expense</h1>
                </div>
                <div className="content-container">
                    <ExpenseForm
                        onSubmit = {this.onSubmit} //Props received from Expense Form
                    />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({startAddExpense: (expense) => dispatch(startAddExpense(expense))}) //To make it easier for testing purposes

export default connect(undefined, mapDispatchToProps)(AddExpensePage);