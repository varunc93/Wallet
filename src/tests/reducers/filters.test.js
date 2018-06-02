import filtersReducer from '../../reducers/filters';
import moment from 'moment';


test("Setup default filter values", () => {
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test("Set sort by amount", () => {
    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT" , sortBy: 'amount'});
    expect(state.sortBy).toBe('amount');
});

test("Set sort by date", () => {
    const currentState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    }
    const state = filtersReducer(currentState, { type: "SORT_BY_DATE", sortBy: 'date' });
    expect(state.sortBy).toBe('date');
});

test("Set text filter", () => {
    const state = filtersReducer(undefined, {type: "SET_TEXT_FILTER", text:"text"});
    expect(state.text).toEqual('text');
});

test("Set startDate filter", () => {
    const startDate= moment(0);
    const state = filtersReducer(undefined, {type: "SET_START_DATE", startDate});
    expect(state.startDate).toEqual(moment(0));
});

test("Set endDate filter", () => {
    const endDate = moment(0);
    const state = filtersReducer(undefined, {type: "SET_END_DATE", endDate});
    expect(state.endDate).toEqual(moment(0));
});