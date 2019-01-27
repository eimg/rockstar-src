import React from 'react';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';

import Header from './Header';
import Add from './Add';
import Todo from './Todo';
import Done from './Done';

import { connect } from 'react-redux';

const api = 'http://206.189.42.134';

class App extends React.Component {
    render() {
        return (
            <div>

                <Header
                    clear={this.props.clear}
                    count={this.props.todo.filter((item) => {
                        return item.status === 0
                    }).length} />

                <Add handler={this.props.add} />

                <Todo
                    done={this.props.done}
                    remove={this.props.remove}
                    data={this.props.todo.filter((item) => item.status === 0)} />

                <Divider />

                <Done
                    undo={this.props.undo}
                    remove={this.props.remove}
                    data={this.props.todo.filter((item) => item.status === 1)} />

                <Snackbar
                    message="Server error"
                    open={this.props.apiError} />
            </div>
        )
    }
}

var ReduxApp = connect((state) => {
    return {
        todo: state.todo,
        apiError: state.apiError || false
    }
}, (dispatch) => {
    return {
        add: (subject) => {
            fetch(`${api}/tasks`, {
                method: 'post',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    subject, status: 0
                })
            }).then((res) => res.json()).then((json) => {
                dispatch({ type: 'ADD', todo: json });
            });
        },
        remove: (_id) => {
            fetch(`${api}/tasks/${_id}`, { method: 'delete' });
            dispatch({ type: 'REMOVE', _id });
        },
        done: (_id) => {
            fetch(`${api}/tasks/${_id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: 1
                })
            });

            dispatch({ type: 'DONE', _id });
        },
        undo: (_id) => {
            fetch(`${api}/tasks/${_id}`, {
                method: 'put',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: 0
                })
            });

            dispatch({ type: 'UNDO', _id });
        },
        clear: () => {
            fetch(`${api}/tasks`, { method: 'delete' });
            dispatch({ type: 'CLEAR' });
        }
    }
})(App);

export default ReduxApp;
