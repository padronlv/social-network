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

    return state;
}
