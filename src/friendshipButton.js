import React, {Component} from 'react';
import axios from './axios';

class FriendshipButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.clickFriendshipButton = this.clickFriendshipButton.bind(this);

    }
    componentDidMount() {
        console.log("mounted friendship button", this.props.otherUserId);
        axios.get('/friendship/' + this.props.otherUserId)
            .then(({data}) => {
                if (!data) {
                    this.setState({
                        buttonText: 'send a friend request',
                        friendshipStatus: null
                    });
                } else if (data.status == 2){
                    this.setState({
                        buttonText: 'unfriend',
                        friendshipStatus: 'friends'
                    });
                } else if (data.status == 1) {
                    if (data.sender_id == this.props.otherUserId) {
                        this.setState({
                            buttonText: 'Accept request for Friendship',
                            friendshipStatus: 'pendingAsReceiver'
                        });
                    } else {
                        this.setState({
                            buttonText: 'Cancel request for friendship',
                            friendshipStatus: 'pendingAsSender'
                        });
                    }

                }

                console.log(data);

            });
    }

    clickFriendshipButton () {
        console.log('button friendship')
        axios.post('/friendship/'+ this.props.otherUserId, this.state)
            .then((resp) => {
                if (resp.data.success) {
                    console.log(resp.data);
                    this.setState({
                        friendshipStatus: resp.data.status,
                        buttonText: resp.data.buttonText
                    });
                }
            });

    }


    render() {
        return (
            <div id="friendshipButton">
                <button onClick={this.clickFriendshipButton} className="friendshipbutton">{this.state.buttonText}</button>
            </div>

        );
    }
}


export default FriendshipButton;
