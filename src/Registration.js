import React, { Component } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';


class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            firstName: "",
            lastName: "",
            email: "",
            password: ""
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
        axios.post('/registration', this.state)
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
            <div className="">
                <h1>Registration</h1>
                {
                    this.state.error
                        ? <div>ERROR: { this.state.error }</div>
                        : null
                }
                <form onSubmit={ this.handleSubmit } className="">
                    <input onChange={ this.handleChange } type="text" name="firstName" placeholder="name"/>
                    <input onChange={ this.handleChange } type="text" name="lastName" placeholder="last name"/>
                    <input onChange={ this.handleChange } type="email" name="email" placeholder="email"/>
                    <input onChange={ this.handleChange } type="password" name="password" placeholder="password" />
                    <button type="submit">Submit</button>
                </form>
                <Link to="/login">Click here to Log in!</Link>

            </div>
        );
    }

}

export default Registration;
