import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest // Gets the remaining props that are not de-structured. Can be given any variable name.
}) => (
    <Route {...rest} component={(props) => (
        isAuthenticated ? (
                <Redirect to="/dashboard"/>
        ) : (
            <Component {...props} />
        )
    )} />
);

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);