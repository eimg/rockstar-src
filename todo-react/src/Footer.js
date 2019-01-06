import React from 'react';

const FooterStyle = {
    padding: 8,
    background: '#eee',
    textAlign: 'right'
}

class Footer extends React.Component {
    render() {
        return(
            <div style={FooterStyle}>
                <a href="#/" onClick={this.props.clear}>
                    Clear all done
                </a>
            </div>
        )
    }
}

export default Footer;
