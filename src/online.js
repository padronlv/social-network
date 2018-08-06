import React from 'react';
import { connect } from 'react-redux';



// import {emitChatMessage } form './sockets'
//
// handleClick(newMsg) {
//
// }
//
//
//
//
// export function emitChatMessage
class Online extends React.Component {
    componentDidMount() {
        // !this.friendsWannabes && this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        const { onlineUsers } = this.props;
        if (!onlineUsers) {
            return null;
        }
        // console.log("this.props", this.props);
        // console.log("friends", friends)
        const onlineUsersDiv = (
            <div>
                <h1>Online</h1>
                <div className="friendsDivOrWannabesDiv">
                    {onlineUsers.map(onlineUser => (
                        <div key={onlineUser.id} className="friend">
                            <img className="OppPicture" src={onlineUser.profile_pic || '/images/default.png'} />
                            <div>{onlineUser.first_name}</div>
                        </div>
                    ))}
                </div>
            </div>
        );

        return (
            <div id="friendsWannabes">
                {!onlineUsers.length && <div>Nobody is Online</div>}
                {!!onlineUsers.length && onlineUsersDiv}
            </div>
        );
    }
}
export default connect(state => {
    return {
        onlineUsers: state.onlineUsers,
    };
})(Online);
