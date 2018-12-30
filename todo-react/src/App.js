import React from 'react';
import './App.css';

class Fruit extends React.Component {
    render() {
        return (
            <li>{this.props.name} - ${this.props.price}</li>
        )
    }
}

class Fruits extends React.Component {
    render() {
        return (
            <ul>
                {this.props.data.map((item) => {
                    return <Fruit name={item.name} price={item.price} />
                })}
            </ul>
        )
    }
}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            data: [
                { name: 'Banana', price: 0.1 },
                { name: 'Papaya', price: 0.3 },
                { name: 'Pineapple', price: 0.5 },
            ]
        }
    }

    render() {
        return (
            <div>
                <Fruits data={this.state.data} />
                <button onClick={() => {
                    var list = this.state.data
                    list.push({
                        name: 'Coconut',
                        price: 0.7
                    })

                    this.setState({
                        data: list
                    })
                }}>
                    Button
                </button>
            </div>
        )
    }
}

export default App
