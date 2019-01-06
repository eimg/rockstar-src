import React from 'react';

const DoneStyle = {
    color: '#999',
    fontSize: '0.8em'
}

const RemoveStyle = {
    float: 'right'
}

class Done extends React.Component {
    render() {
        return (
            <ul style={DoneStyle}>
                {this.props.data.map((item) => {
                    return (
                        <li key={item._id}>
                            <input type="checkbox" onChange={() => {
                                this.props.undo(item._id)
                            }} checked />
                            <s>{item.subject}</s>
                            <a href="#/" style={RemoveStyle} onClick={()=>{
                                this.props.remove(item._id)
                            }}>&times;</a>
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Done;
