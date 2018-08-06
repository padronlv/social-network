export default function(state = {}, action) {
    if (action.type == 'RECEIVE_FRIENDS_WANNABES') {
        console.log("action receive friends wannabes", action.friendsWannabes);
        state = {
            ...state,
            friendsWannabes: action.friendsWannabes
        };
    }
    if (action.type == 'ACCEPT_FRIEND_REQUEST') {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(
                wannabe => {
                    if (wannabe.id == action.id) {
                        return {
                            ...wannabe,
                            status: 2
                        };
                    } else {
                        return wannabe;
                    }
                }
            )
        };
    }

    if (action.type == 'END_FRIENDSHIP') {
        state = {
            ...state,
            friendsWannabes: state.friendsWannabes.map(
                friend => {
                    if (friend.id == action.id) {
                        return {
                            ...friend,
                            status: 0
                        };
                    } else {
                        return friend;
                    }
                }
            )
        };
    }

    if (action.type == 'PUSH_ONLINE_USERS_TO_REDUX') {
        console.log("pushOnlineUsersToRedux", action.onlineUsers);
        state = {
            ...state,
            onlineUsers: action.onlineUsers
        };
    }

    if (action.type == 'USER_JOINED') {
        state = {
            ...state,
            onlineUsers: [...state.onlineUsers, action.user]
        };
    }

    if (action.type == 'USER_LEFT') {
        state = {
            ...state,
            onlineUsers: state.onlineUsers.filter(
                user => user.id != action.user.id
            )
        };
    }

    if (action.type == 'PUSH_CHAT_MESSAGES_TO_REDUX') {
        console.log("pushChatMessagesToRedux", action.chatMessages);
        state = {
            ...state,
            chatMessages: action.chatMessages
        };
    }

    if (action.type == 'NEW_MESSAGE') {
        state = {
            ...state,
            chatMessages: [...state.chatMessages, action.chatMessage]
        };
    }



    return state;
}
