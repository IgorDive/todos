import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import todoApp from './reducers/index';

// const thunks = (store) => (next) => (action) => 
//         typeof action === 'function'? 
//             action(store.dispatch, store.getState): 
//             next(action);
//wrapper for store.dispatch

const configureStore = () => {
    const middlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger());
// createLogger() - create logger middleware function with the default settings;

    const store = createStore(todoApp, applyMiddleware(...middlewares));
// createStore(reducer[, persistentState, enhancer]) enhancer -> applyMiddleware.

    return store;
};

export default configureStore;