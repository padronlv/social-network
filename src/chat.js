import React from 'react';
import { connect } from 'react-redux';
import { newMessageSocket } from'./sockets'




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
class Chat extends React.Component {
    constructor() {
        super();
        this.state = {};

        this.handleChangeTextarea = this.handleChangeTextarea.bind(this);
        this.handleSubmitTextarea = this.handleSubmitTextarea.bind(this);
    }
    handleChangeTextarea(e) {
        this.setState({
            [e.target.name]: e.target.value

        }, () => {
            // console.log(this.state);
        });
    }
    handleSubmitTextarea(e) {
        e.preventDefault();
        // console.log("Running handleSubmit", this.state);
        newMessageSocket(this.state.chatMessage)
    }

    componentDidMount() {
        // !this.friendsWannabes && this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        const { chatMessages } = this.props;
        // console.log("this.props", this.props);
        // console.log("friends", friends)
        const chatDiv = (
            <div>
                <h1>Chat</h1>
                <div className="friendsDivOrWannabesDiv">
                    {chatMessages.map(message => (
                        <div key={message.date} className="friend">
                            {/*<img className="OppPicture" src={message.profile_pic || '/images/default.png'} />*/}
                            <div>{message.userId}</div>
                            <div>{message.content}</div>
                            <div>{message.date}</div>
                        </div>
                    ))}
                    <form onSubmit={ this.handleSubmitTextarea } className="">
                        <textarea className="textArea" name="chatMessage" onChange={ this.handleChangeTextarea }></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        );

        return (
            <div id="friendsWannabes">
                {!chatMessages.length && <div>No messages yet</div>}
                {!!chatMessages.length && chatDiv}

            </div>
        );
    }
}
export default connect(state => {
    return {
        chatMessages: chatMessages,
    };
})(Chat);
