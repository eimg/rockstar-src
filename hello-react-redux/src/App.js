import React, { Component } from 'react';
import { connect } from 'react-redux';

const List = (props) => {
    return (
        <ul>
            {props.items.map((subject) => {
                return <li>{subject}</li>
            })}
        </ul>
    )
}

const App = (props) => {
    let input = React.createRef();

    return (
        <div>
            <input type="text" ref={input} />
            <button onClick={() => {
                var subject = input.current.value;
                props.add(subject);
            }}>+</button>
            <List items={props.state} />
        </div>
    );
}

function state(state) {
    return {
        state: state
    };
}

function dispatch(dispatch) {
    return {
        add: function(subject) {
            dispatch({type: 'add', subject: subject});
        }
    }
}

var ReduxApp = connect(state, dispatch)(App);

export default ReduxApp;
