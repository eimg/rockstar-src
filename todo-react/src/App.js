import React from 'react';
import Divider from '@material-ui/core/Divider';

import Header from './Header';
import Add from './Add';
import Todo from './Todo';
import Done from './Done';

class App extends React.Component {
    constructor() {
        super()
        this.state = {
            todo: [
                { "_id": 1, "subject": "Something to do", "status": 0 },
                { "_id": 2, "subject": "Another thing to do", "status": 0 },
                { "_id": 3, "subject": "More thing to do", "status": 1 },
                { "_id": 4, "subject": "Yet another thing to do", "status": 1 },
            ]
        }

        this.autoid = 4;
        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.done = this.done.bind(this);
        this.undo = this.undo.bind(this);
        this.clear = this.clear.bind(this);
    }

    add(task) {
        var self = this;
        var newTask = {
            "_id": ++self.autoid,
            "subject": task,
            "status": 0
        }

        var todo = this.state.todo;
        todo.push(newTask);

        this.setState({
            todo: todo
        });
    }

    remove(_id) {
        var todo = this.state.todo.filter((item) => {
            return item._id != _id
        });

        this.setState({
            todo: todo
        });
    }

    done(_id) {
        var todo = this.state.todo.map((item) => {
            if(item._id == _id) item.status = 1
            return item;
        });

        this.setState({
            todo: todo
        })
    }

    undo(_id) {
        var todo = this.state.todo.map((item) => {
            if(item._id == _id) item.status = 0
            return item;
        });

        this.setState({
            todo: todo
        })
    }

    clear() {
        var todo = this.state.todo.filter((item) => {
            return item.status === 0
        });

        this.setState({
            todo: todo
        })
    }

    render() {
        return (
            <div>

                <Header
                    clear={this.clear}
                    count={this.state.todo.filter((item) => {
                        return item.status === 0
                    }).length} />

                <Add handler={this.add} />

                <Todo
                    done={this.done}
                    remove={this.remove}
                    data={this.state.todo.filter((item) => item.status === 0)} />

                <Divider />

                <Done
                    undo={this.undo}
                    remove={this.remove}
                    data={this.state.todo.filter((item) => item.status === 1)} />
            </div>
        )
    }
}

export default App
