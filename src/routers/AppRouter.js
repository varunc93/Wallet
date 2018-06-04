import React from 'react';
import { Router, Route, Switch, Link} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import PageNotFound from '../components/PageNotFound';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (    //exact allows it to match the route exactly otherwise "/create" will return html for both "/" and "/create"
    <Router history={history}>
        <div>
            <Switch>
                <PublicRoute path="/" component={LoginPage} exact={true} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                <PrivateRoute path="/create" component={AddExpensePage} />
                <PrivateRoute path="/edit/:id" component={EditExpensePage} />
                <Route component={PageNotFound} />
            </Switch>
        </div>
  </Router>
); //We use switch to perform conditional routing. If and only if the other routes are not found should we render pageNotFound.
//Switch goes through the routes one by one and stops when it finds a match.

export default AppRouter;