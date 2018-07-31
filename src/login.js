import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value

        }, () => {
            console.log(this.state);
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        console.log("Running handleSubmit", this.state);
        axios.post('/login', this.state)
            .then((resp) => {
                if (resp.data.error) {
                    this.setState({
                        error: resp.data.error
                    });
                } else {
                    location.replace('/');
                }
            });
    }
    render() {
        return(
            <div className="login">
                <h1>Login</h1>
                {
                    this.state.error
                        ? <div>ERROR: { this.state.error }</div>
                        : null
                }
                <form onSubmit={ this.handleSubmit } className="form loginForm">
                    <div className="fieldEdit">
                        <h3 className="param">Email</h3>
                        <input className="input" onChange={ this.handleChange } type="email" name="email" placeholder="email"/>
                    </div>
                    <div className="fieldEdit">
                        <h3 className="param">Password</h3>
                        <input className="input" onChange={ this.handleChange } type="password" name="password" placeholder="password" />
                    </div>


                    <button className="submitButton" type="submit">Submit</button>
                </form>
                <Link to="/">You do not have an Account, click here to register</Link>

            </div>
        );
    }

}

export default Login;
