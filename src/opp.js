import React, {Component} from 'react';
import axios from './axios';
import FriendshipButton from './friendshipButton';
import Wall from './wall';

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
            profile_pic,
            bio
        } = this.state;


        return (
            <div id="otherProfile">
                <div className='profileLeft'>
                    <div className="bigName">
                        { first_name } { last_name }
                    </div>
                    <img className="OppPicture" src={profile_pic || '/images/default.png'} />
                    <div className='bioOperator'>
                        { bio
                            ? <div className='realBio'>{ bio }</div>
                            : <div>This person does not have a Bio</div>
                        }
                    </div>
                    <FriendshipButton otherUserId={ this.props.match.params.id } />
                </div>
                <Wall otherUserId={ this.props.match.params.id }/>


            </div>
        );
    }
}


export default Opp;
