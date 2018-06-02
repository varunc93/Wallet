import expenses from '../fixtures/expenses';
import getVisibleExpenses from '../../selectors/expenses';
import moment from 'moment';


test("Filter by text value", () => {
    const filters = {
        text: 'B' ,
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }

    const selector = getVisibleExpenses(expenses, filters);
    expect(selector).toEqual([expenses[1]]);
});

test("Filter by startDate", () => {
    const filters = {
        text: '' ,
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    }

    const selector = getVisibleExpenses(expenses, filters);
    expect(selector).toEqual([expenses[2], expenses[0]]);
});

test("Filter by endDate", () => {
    const filters = {
        text: '' ,
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0)
    }

    const selector = getVisibleExpenses(expenses, filters);
    expect(selector).toEqual([expenses[0], expenses[1]]);
});

test("Filter by date", () => {
    const filters = {
        text: '' ,
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    }

    const selector = getVisibleExpenses(expenses, filters);
    expect(selector).toEqual([expenses[2], expenses[0], expenses[1]]);
});


test("Filter by amount", () => {
    const filters = {
        text: '' ,
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }

    const selector = getVisibleExpenses(expenses, filters);
    expect(selector).toEqual([expenses[2], expenses[0], expenses[1]]);
});