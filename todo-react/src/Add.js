import React from 'react';

const NewStyle = {
    background: '#eee',
    padding: 10
}

class Add extends React.Component {
    constructor() {
        super();

        this.input = React.createRef();
    }

    render() {
        return (
            <div style={NewStyle}>
                <input type="text" ref={this.input} />
                <button onClick={() => {
                    var task = this.input.current.value;
                    if(!task) return false;

                    this.props.handler(task);
                    this.input.current.value = "";
                    this.input.current.focus();
                }}>+</button>
            </div>
        )
    }
}

export default Add;
