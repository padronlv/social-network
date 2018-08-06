import * as io from 'socket.io-client';
import {onlineUsers, userJoined, userLeft} from ...

let socket;

// socket.on('welcome', function(data) {
//     console.log(data);
//     socket.emit('thanks', {
//         message: 'Thank you. It is great to be here.'
//     });
// });

export function init(store) {
    if(!socket) {
        socket = io.connect();
        socket.on('onlineUsers', users => {
            store.dispatch(onlineUsers(users))
        }
        socket.on('userJoined', user => {
            store.dispatch(userJoined(user))
        })

        socket.on('userLeft', user => {
            store.dispatch(userLeft(user))
        })

        socket.on('onlineUsers',data => {
            store.dispatch(pusOnlineUsersToRedux(data))
        })

        socket.emit('chatMsg', singleChatMessage)


        })
    }
}
