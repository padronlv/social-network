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

export function userJoined (user) {
    return {
        type:'USER_JOINED',
        user
    }
}

export function pushOnlineUsersToRedux() {
    return {
        type: ''
        
    }
}
