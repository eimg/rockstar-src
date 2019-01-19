import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

var store = createStore(function(state = [], action) {
    if(action.type == 'add') {
        return [
            ...state,
            action.subject
        ];
    }
    if(action.type == 'sub') {
        return state.filter(function(item) {
            return action.subject != item;
        });
    }

    return state;
});

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
