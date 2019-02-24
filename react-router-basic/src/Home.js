import React from 'react';

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>{this.props.content}</p>
            </div>
        )
    }
}

export default Home;
