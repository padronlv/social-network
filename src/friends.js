import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { receiveFriendsWannabes, acceptFriendRequest, endFriendship  } from './actions';

class Friends extends React.Component {
    componentDidMount() {
        !this.friendsWannabes && this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        const { friends, wannabes, friendsWannabes } = this.props;
        if (!friendsWannabes) {
            return null;
        }
        // console.log("this.props", this.props);
        // console.log("friends", friends)
        const friendsDiv = (
            <div>
                <h1>your friends</h1>
                <div className="friendsDivOrWannabesDiv">
                    {friends.map(friend => (
                        <div key={friend.id} className="friend">
                            <img className="OppPicture" src={friend.profile_pic || '/images/default.png'} />
                            <div>{friend.first_name}
                                <div className="buttons">
                                    <button onClick={
                                        () => this.props.dispatch(endFriendship(friend.id))
                                    }>End Friendship</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

        const WannabesDiv = (
            <div>
                <h1>This people want to be your friends... who knows why...</h1>
                <div className="friendsDivOrWannabesDiv">
                    {wannabes.map(wannabe => (
                        <div key={wannabe.id} className="wannabe">
                            <img className="OppPicture" src={wannabe.profile_pic || '/images/default.png'} />
                            <div>{wannabe.first_name}
                                <div className="buttons">
                                    <button onClick={
                                        () => this.props.dispatch(acceptFriendRequest(wannabe.id))
                                    }>Accept friend request</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
        return (
            <div id="friendsWannabes">
                {!friends.length && <div>Nobody is your friend... so sad</div>}
                {!!friends.length && friendsDiv}

                {!wannabes.length && <div>No pending requests</div>}
                {!!wannabes.length && WannabesDiv}

            </div>
        );
    }
}
export default connect(state => {
    return {
        friendsWannabes: state.friendsWannabes,
        friends: state.friendsWannabes && state.friendsWannabes.filter(f => f.status == 2),
        wannabes: state.friendsWannabes && state.friendsWannabes.filter(f => f.status == 1)
    };
})(Friends);
