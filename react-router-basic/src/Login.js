import React from 'react';

class Login extends React.Component {
    username = React.createRef();
    password = React.createRef();

    login = () => {
        var username = this.username.current.value;
        var password = this.password.current.value;
        this.props.login(username, password);
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <input type="text" ref={this.username} /><br />
                <input type="password" ref={this.password} /><br /><br />
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default Login;
