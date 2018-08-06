import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome';
import App from './app';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import reducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import  { init } from './socket';

if (location.pathname != '/welcome') {
    init(store);
}

// import * as io from 'socket.io-client';
//
// const socket = io.connect();
//
// socket.on('welcome', function(data) {
//     console.log(data);
//     socket.emit('thanks', {
//         message: 'Thank you. It is great to be here.'
//     });
// });

const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));

let component;

if (location.pathname == "/welcome") {
    component = <Welcome />;
} else {
    component = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    component,
    document.querySelector('main')
);

// function HelloWorld() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
