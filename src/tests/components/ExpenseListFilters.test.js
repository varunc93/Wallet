import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test("Render ExpenseFilters snapshot", () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Render ExpenseFilters with alternate data", () => {
    wrapper.setProps({
        filters: altFilters
    });
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Handle texts for ExpenseFilters", () => {
    const value = "text test";
    wrapper.find("input").simulate("change", {
        target: { value }
    });
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Sort by date ExpenseFilters", () => {
    const value = "date";
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find("select").simulate("change", {
        target: {value}
    });
    expect(sortByDate).toHaveBeenCalled();
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Sort by amount ExpenseFilters", () => {
    const value = "amount"
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find("select").simulate("change", {
        target: {value}
    });
    expect(sortByAmount).toHaveBeenCalled();
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Handle date changes ExpenseFilters", () => {
    const startDate = moment(0).add(4, "years");
    const endDate = moment(0).add(8, "years");
    wrapper.find("[onDatesChange]").prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("Handle date focus changes ExpenseFilters", () => {
    const focused = 'endDate';
    wrapper.find("[onFocusChange]").prop('onFocusChange')(focused);
    expect(wrapper.state('focused')).toBe(focused);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

