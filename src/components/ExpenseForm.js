import 'react-dates/initialize';
import React from 'react';
import moment from 'moment';
import {SingleDatePicker} from 'react-dates';

export default class ExpenseForm extends React.Component {
    constructor(props) { //This is done to get access to props
        super(props);
        this.state = {
            description: props.expense ? props.expense.description : "",
            amount: props.expense ? (props.expense.amount/100).toString() : "",
            text: props.expense ? props.expense.text : "",
            createdAt: props.expense ? moment(props.expense.createdAt): moment(),
            focused: false,
            error:""
        }
    };

    handleDescription = (event) => {
        const description = event.target.value;
        this.setState(() => ({description}));
    };

    //OR
    // handleDescription = (event) => {
    //     event.persist;
    //     this.setState(() => ({description: event.target.value}));
    // }

    handleAmount = (event) => {
        const amount = event.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) //We use regular expressions to check validation. ^-ensures the user starts with a number
        //\d-ensures it's a number, *- to allow multiple digits, ()-allows optional parameters,
        //?-ensures the parameter is only allowed once, \.-allows one decimal digit, {0,2}-allows upto 2 characters
        //$ ensures we end the input with the regular expression mentioned
        //match() takes in regular expression, /<place regular expression here>/
        // !amount allows user to clear the data in the amount box
        this.setState(() => ({amount}));
    };

    handleText = (event) => {
        const text = event.target.value;
        this.setState(() => ({text}));
    };

    onDateChange = (createdAt) => {
        if (createdAt) {
          this.setState(() => ({ createdAt }));
        }
    };

    onFocusChange = ({focused}) => {
        this.setState(() => ({focused}));
    };

    onSubmit = (event) => {
        event.preventDefault();
        if(!this.state.description || !this.state.amount){
            this.setState((error) => true);
            if(!this.state.description){
               this.setState(() => ({error: "Error: Please enter description"}))
            }
            else{
                this.setState(() => ({error: "Error: Please enter amount"}))
            }
        }
        else {
            this.setState(() => ({error: ""}))
            this.props.onSubmit({ //Props to be passed to Add and Edit Expense Pages
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100, //Since amount is stored as string
                text: this.state.text,
                createdAt: this.state.createdAt.valueOf()
            });
        }
    };

    //Button is placed inside a div to prevent it from being a direct descendant.
    render () {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input className="text-input" type="text" placeholder="Description" autoFocus value={this.state.description} onChange={this.handleDescription}/>
                <input className="text-input" type="text" placeholder="Amount" value= {this.state.amount} onChange={this.handleAmount}/>
                <textarea className="textarea" placeholder="Add a note..." value={this.state.text} onChange={this.handleText}></textarea>
                <SingleDatePicker
                    date={this.state.createdAt}
                    onDateChange={this.onDateChange}
                    focused={this.state.focused}
                    onFocusChange={this.onFocusChange}
                    numberOfMonths={1}
                    isOutsideRange={() => false}
                />
                <div>
                    <button className="button">Save Expense</button>
                </div>
            </form>
        )
    };

}
