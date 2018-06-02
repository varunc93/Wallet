import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';

export class AddExpensePage extends React.Component {
    onSubmit = (expense) => {
        // props.dispatch(addExpense(expense));
        this.props.addExpense(expense);
        this.props.history.push("/"); //push takes in a path to reroute to a stored path
    };

    render() {
        return (
            <div>
                <h1>Add Expense</h1>
                <ExpenseForm
                    onSubmit = {this.onSubmit} //Props received from Expense Form
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({addExpense: (expense) => dispatch(addExpense(expense))}) //To make it easier for testing purposes

export default connect(undefined, mapDispatchToProps)(AddExpensePage);