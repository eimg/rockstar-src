import React from 'react';

const HeaderStyle = {
    margin: 0,
    padding: 8,
    fontSize: 18,
    background: '#ddd'
}

class Header extends React.Component {
    render() {
        return(
            <h1 style={HeaderStyle}>
                React Todo ({this.props.count})
            </h1>
        )
    }
}

export default Header;
