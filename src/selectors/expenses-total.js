import React from 'react';


const selectExpensesTotal = (expenses) => expenses.map((expense) => expense.amount).reduce((total, expense) => total + expense, 0);

export default selectExpensesTotal;