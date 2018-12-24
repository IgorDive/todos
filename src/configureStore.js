import { createStore } from 'redux';
import todoApp from './reducers/index';

const configureStore = () => {
    const store = createStore(
        todoApp
    );

    const addPromiseSupportToDispatch = store => {
        const next = store.dispatch;

        return (action) => {
            if ( typeof action.then === 'function') return action.then(a => next(a));
                
            return next(action);
        }
    }

    const addLoggingToDispatch = store => {
        const next = store.dispatch;

        if (!console.group) return next;
        
        return (action) => {
            console.group(action.type);
            console.log('%c prev state', 'color: gray', store.getState());
            console.log('%c action', 'color: blue', action); 
            const returnValue = next(action);
            console.log('%c next state', 'color: green', store.getState());
            console.groupEnd(action.type);
            return returnValue;    
        }
    };
    
    if (process.env.NODE_ENV !== 'production') {
        store.dispatch = addLoggingToDispatch(store);
    }

    store.dispatch = addPromiseSupportToDispatch(store);

    return store;
}

export default configureStore;