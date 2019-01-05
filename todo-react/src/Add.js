import React from 'react';

const ButtonStyle = {
    padding: 4
}

const NewStyle = {
    background: '#eee',
    padding: 10
}

class Add extends React.Component {
    render() {
        return (
            <div style={NewStyle}>
                <input type="text" ref={this.input} />
                <button style={ButtonStyle}>+</button>
            </div>
        )
    }
}

export default Add;
