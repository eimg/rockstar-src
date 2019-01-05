import React from 'react';
import Header from './Header';
import Add from './Add';
import Todo from './Todo';
import Done from './Done';

const AppStyle = {
    fontFamily: 'arial',
    width: 500,
    margin: '20px auto',
    border: '4px solid #ddd',
    borderRadius: 5,
    background: '#ffe'
}

const ContentStyle = {
    padding: 20
}

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todo: [
                { "_id": 1, "subject": "Something to do" },
                { "_id": 2, "subject": "Another thing to do" },
            ],
            done: [
                { "_id": 3, "subject": "More thing to do" },
                { "_id": 4, "subject": "Yet another thing to do" },
            ]
        }
    }

    render() {
        return (
            <div style={AppStyle}>
                <Header count={this.state.todo.length} />
                <Add />
                <div style={ContentStyle}>
                    <Todo data={this.state.todo} />
                    <hr />
                    <Done data={this.state.done} />
                </div>
            </div>
        )
    }
}

export default App
