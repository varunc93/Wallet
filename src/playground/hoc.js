//Higher order components - A component that renders another component.
//Advantages of using HOC:
//Reuse code
//Render hijacking
//Prop manipulation
//Abstract State

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Header</h1>
        <p>Details: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private information, please do not share!</p>}
            <WrappedComponent {...props}/>
        </div>
    )
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {!props.isAuth ? <p>Please Login to View details</p> : props.isAuth && <WrappedComponent {...props}/>}
        </div>
    )
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

//ReactDOM.render(<AdminInfo isAdmin={true} info="These are the details"/>, document.querySelector(".app"));
//We can pass additional props like isAdmin
ReactDOM.render(<AuthInfo isAuth={true} info="These are the details"/>, document.querySelector(".app"));
