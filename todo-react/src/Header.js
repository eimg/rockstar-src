import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';

const styles = {
    toolbar: {
        paddingTop: 5,
        paddingRight: 15,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            anchorEl: null
        }

        this.menuOpen = this.menuOpen.bind(this);
        this.menuClose = this.menuClose.bind(this);
    }

    menuOpen(event) {
        this.setState({ anchorEl: event.currentTarget });
    }

    menuClose() {
        this.setState({ anchorEl: null });
    }

    render() {
        return(
            <AppBar position="static">
                <Toolbar style={styles.toolbar}>
                    <IconButton
                        style={styles.menuButton}
                        color="inherit">
                        <Badge
                            badgeContent={this.props.count}
                            color="secondary">
                            <DoneAllIcon />
                        </Badge>
                    </IconButton>
                    <Typography
                        variant="h6"
                        color="inherit"
                        style={styles.grow}>
                        React Todo
                    </Typography>
                    <IconButton
                        color="inherit"
                        onClick={this.menuOpen}>
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        anchorEl={this.state.anchorEl}
                        open={Boolean(this.state.anchorEl)}
                        onClose={this.menuClose}>
                        <MenuItem onClick={() => {
                            this.props.clear()
                            this.menuClose()
                        }}>
                            Clear All Done
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Header;
