import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import toJSON from 'enzyme-to-json';
import expense from "../fixtures/expenses";

test("ExpenseSummary should render 1 expense correctly", () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={1} expensesTotal={235}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test("ExpenseSummary should render multiple expenses correctly", () => {
    const wrapper = shallow(<ExpenseSummary expenseCount={4} expensesTotal={10392389} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
});


