import moment from 'moment';
//Selectors

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {  //de-structure filters
    return expenses.filter((expense) => {
        const createdAtMoment = moment(expense.createdAt);
        const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
        const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
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

export default getVisibleExpenses;