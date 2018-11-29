import { createStore } from 'redux';
import todoApp from './reducers/index';

const configureStore = () => {
    const store = createStore(
        todoApp
    );

    const addLoggingToDispatch = (dispatch) => {
        if (!console.group) return dispatch;
        
        return (action) => {
            console.group(action.type);
            console.log('%c prev state', 'color: gray', store.getState());
            console.log('%c action', 'color: blue', action); 
            const returnValue = dispatch(action);
            console.log('%c next state', 'color: green', store.getState());
            console.groupEnd(action.type);
            return returnValue;    
        }
    };
    
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store.dispatch);
    }

    return store;
}

export default configureStore;