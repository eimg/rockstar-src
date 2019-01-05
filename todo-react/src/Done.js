import React from 'react';

class Done extends React.Component {
    render() {
        return (
            <ul>
                {this.props.data.map((item) => {
                    return (
                        <li key={item._id}>
                            {item.subject}
                        </li>
                    )
                })}
            </ul>
        )
    }
}

export default Done;
