import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ToolbarAndroid,
    FlatList,
    TouchableOpacity,
    TextInput,
    Button,
} from 'react-native';
import {
    MaterialIcons,
} from '@expo/vector-icons';

const styles = StyleSheet.create({
    toolbar: {
        padding: 20,
        paddingTop: 40,
        backgroundColor: 'steelblue',
        elevation: 4,
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
        color: 'white',
        marginLeft: 25,
        flex: 10
    },
    task: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row'
    },
    text: {
        fontSize: 18,
        flex: 10
    },
    splitter: {
        fontWeight: 'bold',
        margin: 20,
        color: '#666'
    },
    add: {
        margin: 20,
        flexDirection: 'row'
    },
    input: {
        borderColor: 'steelblue',
        borderWidth: 1,
        padding: 8,
        flex: 10
    }
});

class App extends React.Component {
    currentKey = 3;

    state = {
        todo: [
            { key: '1', subject: 'Milk', status: 0 },
            { key: '2', subject: 'Apple', status: 1 },
            { key: '3', subject: 'Bread', status: 0 },
        ],
        text: ''
    }

    componentDidMount () {
        fetch('http://206.189.42.134/tasks').then((res) => res.json()).then((json) => {
            this.setState({
                todo: json
            })
        });
    }

    add = () => {
        var newKey = ++this.currentKey + '';
        this.setState({
            todo: [
                ...this.state.todo,
                { key: newKey, subject: this.state.text, status: 0 }
            ],
            text: ''
        });

        fetch(`http://206.189.42.134/tasks`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subject: this.state.text, status: 0
            })
        });
    }

    clear = () => {
        this.setState({
            todo: this.state.todo.filter((task) => task.status === 0)
        })
    }

    remove = (key) => {
        this.setState({
            todo: this.state.todo.filter((task) => task.key !== key)
        })
    }

    done = (key) => {
        this.setState({
            todo: this.state.todo.map((task) => {
                if(task.key === key) task.status = 1;
                return task;
            })
        })
    }

    undo = (key) => {
        this.setState({
            todo: this.state.todo.map((task) => {
                if(task.key === key) task.status = 0;
                return task;
            })
        })
    }

    renderItem = ({item}) => {
        return (
            <View style={styles.task}>
                {item.status === 0 ? (
                    <TouchableOpacity style={{flex: 2}} onPress={() => {
                        this.done(item.key)
                    }}>
                        <MaterialIcons
                            name="check-box-outline-blank" size={24} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={{flex: 2}} onPress={() => {
                        this.undo(item.key)
                    }}>
                        <MaterialIcons
                            name="check-box" size={24} />
                    </TouchableOpacity>
                )}
                <Text style={styles.text}>{item.subject}</Text>
                <TouchableOpacity style={{flex: 1}} onPress={()=>{
                    this.remove(item.key)
                }}>
                    <MaterialIcons name="delete" size={24} />
                </TouchableOpacity>
            </View>
        )
    }

    keyExtractor = (item, index) => item._id

    render() {
        return (
            <View>
                <View style={styles.toolbar}>
                    <MaterialIcons name="done-all" size={32} color="white" />
                    <Text style={styles.title}>Todo Native</Text>
                    <TouchableOpacity onPress={this.clear}>
                        <MaterialIcons name="clear-all" size={32} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.add}>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your task"
                        onChangeText={(text) => {
                            this.setState({ text: text })
                        }}
                        value={this.state.text}
                    />
                    <Button title="Add" onPress={this.add} />
                </View>

                <FlatList
                    data={this.state.todo.filter(task=>task.status === 0)}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
                <View><Text style={styles.splitter}>Done</Text></View>
                <FlatList
                    data={this.state.todo.filter(task=>task.status === 1)}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

export default App;
