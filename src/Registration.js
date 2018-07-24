import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {
    constructor() {
        super();

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
            .then(() => {
                location.replace('/');
            });
    }
    render() {
        return(
            <div className="">
                <h1>Registration</h1>
                <form onSubmit={ this.handleSubmit } className="">
                    <input onChange={ this.handleChange } type="text" name="firstName" placeholder="name"/>
                    <input onChange={ this.handleChange } type="text" name="lastName" placeholder="last name"/>
                    <input onChange={ this.handleChange } type="text" name="email" placeholder="email"/>
                    <input onChange={ this.handleChange } type="text" name="password" placeholder="password" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }

}

export default Registration;
