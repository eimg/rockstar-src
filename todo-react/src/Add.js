import React from 'react';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';

const styles = {
    root: {
        borderRadius: 0,
        boxSizing: 'border-box',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        marginLeft: 8,
        flexGrow: 1,
    },
    iconButton: {
        marginRight: 15,
        padding: 10,
    },
};

class Add extends React.Component {
    constructor() {
        super();

        this.input = React.createRef();
    }

    render() {
        return (
            <div>
                <Paper style={styles.root} elevation={1}>
                    <InputBase
                        style={styles.input}
                        placeholder="Enter todo"
                        inputRef={this.input} />
                    <IconButton
                        style={styles.iconButton}
                        color="primary"
                        onClick={() => {
                            var task = this.input.current.value;
                            if(!task) return false;

                            this.props.handler(task);
                            this.input.current.value = "";
                            this.input.current.focus();
                        }}>
                        <DirectionsIcon />
                    </IconButton>
                </Paper>
            </div>
        )
    }
}

export default Add;
