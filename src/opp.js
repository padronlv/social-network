import React, {Component} from 'react';
import axios from './axios';
import FriendshipButton from './friendshipButton';

class Opp extends Component {
    constructor(props) {
        super(props);

        this.state = {};

    }
    componentDidMount() {
        // console.log(this.props.match.params.id);
        axios.get('/user/' + this.props.match.params.id + '.json')
            .then(({data}) => {
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    this.setState(data);
                }
            });
    }
    render() {
        const {
            first_name,
            last_name,
            id,
            image,
            bio
        } = this.state;


        return (
            <div id="otherProfile">
                <h1>Profile</h1>
                <p>{ first_name } { last_name }</p>

                { bio
                    ? <p> { bio } </p>
                    : <p> this user does not have a bio </p>
                }

                <FriendshipButton otherUserId={ this.props.match.params.id } />
            </div>
        );
    }
}


export default Opp;
