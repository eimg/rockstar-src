import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    width: '100%',
  },
};

class Todo extends React.Component {
    render() {
        return (
            <List style={styles.root}>
                {this.props.data.map((item) => {
                    return (
                        <ListItem key={item._id}>
                            <Checkbox disableRipple onChange={() => {
                                this.props.done(item._id)
                            }} />
                            <ListItemText primary={item.subject}/>
                            <IconButton onClick={() => {
                                this.props.remove(item._id)
                            }}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    )
                })}
            </List>
        )
    }
}

export default Todo;
