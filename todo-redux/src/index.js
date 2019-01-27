import React from 'react';
import ReactDOM from 'react-dom';
import ReduxApp from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const api = 'http://206.189.42.134';

var store = createStore((state = { todo: [] }, action) => {
    switch (action.type) {
        case 'ADD':
            return {
                todo: [ ...state.todo, action.todo ]
            }
            break;
        case 'REMOVE':
            return {
                todo: state.todo.filter((item) => item._id !== action._id)
            }
            break;
        case 'DONE':
            return {
                todo: state.todo.map((item) => {
                    if(item._id == action._id) item.status = 1;
                    return item;
                })
            }
            break;
        case 'UNDO':
            return {
                todo: state.todo.map((item) => {
                    if(item._id == action._id) item.status = 0;
                    return item;
                })
            }
            break;
        case 'CLEAR':
            return {
                todo: state.todo.filter((item) => item.status === 0)
            }
            break;
        case 'SET':
            return {
                todo: action.todo
            }
        default:
            return state;
    }
});

fetch(`${api}/tasks`).then((res) => res.json()).then((json) => {
    store.dispatch({ type: 'SET', todo: json });
});

ReactDOM.render(
    <Provider store={store}>
        <ReduxApp />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
