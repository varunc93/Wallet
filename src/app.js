import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

let hasRendered = false;

const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.querySelector('.app'));
    hasRendered = true;
  }
};

ReactDOM.render(<p>Loading...</p>, document.querySelector('.app'));


 //we pass the uid here itself to handle the implicit case when user is logged in, i.e, whenever the user is already logged in and revisits tha application.

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
			console.log("Before if");
			if (history.location.pathname === '/') {
				history.push('/dashboard');
				console.log("After if");
			}
		});
	} else {
		console.log("Else before render");
		store.dispatch(logout());
		renderApp();
		console.log("Else after render");
		history.push('/');
	}
});
