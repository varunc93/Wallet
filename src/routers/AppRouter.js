import React from 'react';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import AddExpensePage from '../components/AddExpensePage';
import DashboardPage from '../components/DashboardPage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import PageNotFound from '../components/PageNotFound';
import Header from '../components/Header';

const AppRouter = () => (    //exact allows it to match the route exactly otherwise "/create" will return html for both "/" and "/create"
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={DashboardPage} exact={true}/>
                <Route path="/create" component={AddExpensePage}/>
                <Route path="/edit/:id" component={EditExpensePage}/>
                <Route path="/help" component={HelpPage}/>
                <Route component={PageNotFound}/>
            </Switch>
        </div>
    </BrowserRouter>
); //We use switch to perform conditional routing. If and only if the other routes are not found should we render pageNotFound.
//Switch goes through the routes one by one and stops when it finds a match.

export default AppRouter;