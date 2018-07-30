import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Registration from './registration';
import Login from './login';
import NavLogout from './navLogout';

function Welcome() {
    return (
        <div id="welcome">
            <NavLogout />
            <h1>Welcome!</h1>
            <img className="bigLogo" src="./images/logo.png" />
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route exact path="/login" component={Login} />
                </div>
            </HashRouter>
        </div>
    );
}

export default Welcome;
