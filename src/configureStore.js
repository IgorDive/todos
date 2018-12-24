import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
import todoApp from './reducers/index';



const configureStore = () => {
    const middlewares = [promise];
// promise - promise middleware function;

    if (process.env.NODE_ENV !== 'production') middlewares.push(createLogger());
// createLogger() - create logger middleware function with the default settings;

    const store = createStore(todoApp, applyMiddleware(...middlewares));
// createStore(reducer[, persistentState, enhancer]) enhancer -> applyMiddleware.

    return store;
};

export default configureStore;