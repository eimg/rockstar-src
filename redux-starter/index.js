var createStore = require('redux').createStore;
var store = createStore(function(state = [], action) {
    if(action.type == 'add') {
        return [
            ...state,
            action.subject
        ];
    }
    if(action.type == 'sub') {
        return state.filter(function(item) {
            return action.subject != item;
        });
    }
});

store.subscribe(function() {
    console.log( store.getState() );
});

store.dispatch({ type: 'add', subject: 'Apple' });
store.dispatch({ type: 'add', subject: 'Orange' });
store.dispatch({ type: 'add', subject: 'Milk' });
store.dispatch({ type: 'sub', subject: 'Orange' });
