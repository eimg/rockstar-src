import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Redirect } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Login from './Login';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const styles = {
    bannerButton: {
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0, 0, 0, 0.4)',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '0 0 10px 0',
        border: '0 none'
    },
    banner: {
        width: 300,
        height: 200
    },
    hide: {
        display: 'none'
    }
}

class App extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            src: 'default.png',
            auth: false,
            content: 'none'
        }

        this.fileInput = React.createRef();
        this.form = React.createRef();
    }

    login = (username, password) => {
        fetch('http://localhost:8000/login', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username, password
            })
        }).then(res => {
            if(res.ok)
                return res.json();

            alert("Auth fail");
        }).then(json => {
            this.setState({auth: json.token});

            fetch('http://localhost:8000/admin', {
                method: 'get',
                headers: {
                    'Authorization': 'Bearer ' + this.state.auth
                }
            }).then(res => res.json()).then(json => {
                this.setState({
                    content: json.content
                });
            });
        });
    }

    changeBanner = () => {
        const reader = new FileReader();
        reader.onload = (() => {
            let formData = new FormData( this.form.current );

            fetch('http://localhost:8000/upload', {
                method: 'post',
                body: formData
            });

            return (e) => {
                this.setState({
                    src: e.target.result
                });
            }
        })();

        reader.readAsDataURL(this.fileInput.current.files[0]);
    }

    render() {
        return (
            <Router>
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton color="inherit" onClick={() => {
                                this.setState({open: true})
                            }}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                React Router
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    <Drawer open={this.state.open} onClose={() => {
                        this.setState({open: false})
                    }}>
                        <div>
                            <form enctype="multipart/form-data" ref={this.form}>
                                <input type="file" name="banner" style={styles.hide} ref={this.fileInput} onChange={this.changeBanner} />
                            </form>

                            <button style={styles.bannerButton} onClick={() => {
                                this.fileInput.current.click();
                            }}>Change Banner</button>

                            <img src={this.state.src} alt="Banner" style={styles.banner} />
                        </div>

                        <List style={{width: 300}}>

                            <Link to="/">
                                <ListItem button onClick={() => {
                                    this.setState({open: false})
                                }}>
                                    <ListItemText primary="Home" />
                                </ListItem>
                            </Link>

                            <Link to="/about">
                                <ListItem button onClick={() => {
                                    this.setState({open: false})
                                }}>
                                    <ListItemText primary="About" />
                                </ListItem>
                            </Link>

                            <Link to="/login">
                                <ListItem button onClick={() => {
                                    this.setState({open: false})
                                }}>
                                    <ListItemText primary="Login" />
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>

                    <Route path="/" exact render={() => {
                        if(this.state.auth) {
                            return (<Home content={this.state.content} />)
                        } else {
                            return (<Redirect to="/login" />)
                        }
                    }} />

                    <Route path="/about" component={About} />

                    <Route path="/login" render={() => {
                        if(this.state.auth) {
                            return (<Redirect to="/" />)
                        } else {
                            return <Login login={this.login} />
                        }
                    }} />

                    <Route path="/more/:label" component={More} />

                    <BottomNavigation style={{
                        position: 'fixed',
                        bottom: 0,
                        width: '100%'
                    }}>
                        <Link to="/more/recent">
                            <BottomNavigationAction icon={<RestoreIcon />} />
                        </Link>
                        <Link to="/more/favorites">
                            <BottomNavigationAction icon={<FavoriteIcon />} />
                        </Link>
                        <Link to="/more/nearby">
                            <BottomNavigationAction icon={<LocationOnIcon />} />
                        </Link>
                    </BottomNavigation>
                </div>
            </Router>
        );
    }
}

const More = props => <div>{props.match.params.label}</div>

export default App;
