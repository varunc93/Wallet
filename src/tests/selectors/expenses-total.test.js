import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from "../fixtures/expenses";

test("return 0 if no expenses", () => {
    const result = selectExpensesTotal([]);
    expect(result).toBe(0);
});

test("return a single expense", () => {
    const result = selectExpensesTotal([expenses[0]]);
    expect(result).toBe(500);
});

test("return sum of total expenses", () =>{
    const result = selectExpensesTotal(expenses);
    expect(result).toBe(1600);
});