import React, { Component } from 'react';
import { connect } from 'react-redux';

class List extends Component {
    render() {
        return (
            <ul>
                {this.props.items.map((subject) => {
                    return <li>{subject}</li>
                })}
            </ul>
        )
    }
}

class App extends Component {
    constructor() {
        super();
        this.input = React.createRef();
        this.add = this.add.bind(this);
    }

    add() {
        var subject = this.input.current.value;
        this.props.add(subject);
    }

    render() {
        return (
            <div>
                <input type="text" ref={this.input} />
                <button onClick={this.add}>+</button>
                <List items={this.props.state} />
            </div>
        );
    }
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
