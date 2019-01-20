import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';

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

class App extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
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
                        <div style={{
                            height: 100,
                            background: 'gray'
                        }}></div>
                        <List style={{width: 200}}>

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

                            <Link to="/contact">
                                <ListItem button onClick={() => {
                                    this.setState({open: false})
                                }}>
                                    <ListItemText primary="Contact" />
                                </ListItem>
                            </Link>
                        </List>
                    </Drawer>

                    <Route path="/" exact component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/contact" component={Contact} />
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

const Home = props => <div>Home</div>
const About = props => <div>About</div>
const Contact = props => <div>Contact</div>
const More = props => <div>{props.match.params.label}</div>

export default App;
