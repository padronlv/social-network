import React, { Component } from 'react';

class Logo extends Component {
    constructor() {
        super();
        this.state = {};

    }

    render() {
        return(
            <div className="">
                <img className="logo" src="/images/logo.png" alt="logo"/>
            </div>
        );
    }

}

export default Logo;
