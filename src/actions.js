import axios from './axios';

export async function receiveFriendsWannabes() {
    const friendsList = await axios.get('/friendsList');
    // console.log("data receiveFriendsWannabes", friendsList)
    return {
        type: 'RECEIVE_FRIENDS_WANNABES',
        friendsWannabes: friendsList.data
    };
}

export async function acceptFriendRequest(id) {
    const x = await axios.post(`/friendship/${id}`, { friendshipStatus: 'pendingAsReceiver'});
    return {
        type: 'ACCEPT_FRIEND_REQUEST',
        id
    };
}

export async function endFriendship(id) {
    const x = await axios.post(`/friendship/${id}`, { friendshipStatus: 'friends'});
    return {
        type: 'END_FRIENDSHIP',
        id
    };
}

export function pushOnlineUsersToRedux(onlineUsers) {
    return {
        type: 'PUSH_ONLINE_USERS_TO_REDUX',
        onlineUsers

    };
}
export function userJoined (user) {
    console.log('userjoined' , user);
    return {
        type:'USER_JOINED',
        user
    };
}

export function userLeft (user) {
    console.log('userLeft' , user);
    return {
        type:'USER_LEFT',
        user
    };
}
export function pushChatMessagesToRedux(chatMessages) {
    return {
        type: 'PUSH_CHAT_MESSAGES_TO_REDUX',
        chatMessages
    };
}
export function newMessageAction (chatMessage) {
    console.log('newMessage' , chatMessage);
    return {
        type:'NEW_MESSAGE',
        chatMessage
    };
}
