import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk'; //Good practice to use 3rd party imports first then our own
import expenseReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';
import authReducers from '../reducers/auth';


const  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
    const store = createStore(
        combineReducers({
            expenses: expenseReducer,
            filters: filtersReducer,
            auth: authReducers
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
}