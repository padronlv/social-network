import React from 'react';
import { connect } from 'react-redux';
import { newMessageSocket } from'./socket';




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
        newMessageSocket(this.state.chatMessage);
    }

    componentDidMount() {
        // !this.friendsWannabes && this.props.dispatch(receiveFriendsWannabes());
    }
    render() {
        const { chatMessages } = this.props;
        // console.log("this.props", this.props);
        // console.log("friends", friends)
        if (!chatMessages) {
            return null;
        }
        let chatMessagesArray = chatMessages.slice(-10,)
        const chatDiv = (
            <div>
                <h1>Chat</h1>
                <div className="chatMessages">
                    {chatMessagesArray.map(message => (
                        <div key={message.date} className="message">
                            <img className="pictureForChat" src={message.profilePic || '/images/default.png'} />
                            <div className='userId'>{message.userId}</div>
                            <div className='firstName'>{message.firstName}</div>
                            <div className='content'>{message.content}</div>
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
            <div id="MessagesOrNot">
                {/*{!chatMessages.length && <div>No messages there yet</div>}
                {!!chatMessages.length && chatDiv}
*/}
                {chatDiv}
            </div>
        );
    }
}
export default connect(state => {
    return {
        chatMessages: state.chatMessages,
    };
})(Chat);
