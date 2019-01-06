import React from 'react';

const RemoveStyle = {
    float: 'right'
}

class Todo extends React.Component {
    render() {
        return (
            <ul>
                {this.props.data.map((item) => {
                    return (
                        <li key={item._id}>
                            <input type="checkbox" onChange={() => {
                                this.props.done(item._id)
                            }} />
                            {item.subject}
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

export default Todo;
