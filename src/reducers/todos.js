import { combineReducers } from 'redux';
import todo from './todo'

const byId = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_TODO': 
        case 'TOGGLE_TODO': return {...state, [action.id]: todo(state[action.id], action)};
        case 'RECEIVE_TODOS': 
            let tempArrOfTodos = {};
            
            action.response.forEach( todo => {
                if (todo.id in state) return;
                tempArrOfTodos[todo.id] = todo
            } );
            return {...state, ...tempArrOfTodos};
        default: return state;
    }
}; 
 
const allIds = (state = [], action) => {
    switch (action.type) { 
        case 'ADD_TODO': return [...state, action.id];
        case 'RECEIVE_TODOS': 
            let tempObjectOfValues = {};
            let tempArrOfId = [];

            for ( let i = 0; i < state.length; i++) {
                tempObjectOfValues[state[i]] = true;
            }
            action.response.forEach(todo => {
                if(todo.id in tempObjectOfValues) return;
                tempArrOfId.push(todo.id);
            });
            return [...state, ...tempArrOfId];
        default: return state;
    }
};

const todos = combineReducers({
    byId,
    allIds
});

export default todos;

const getAllTodos = (state) => state.allIds.map( id => state.byId[id]); 

export const getVisibleTodos = (state, filter) => {
    let allTodos = getAllTodos(state);
    
    switch(filter) {
        case 'all': return allTodos;
        case 'active': return allTodos.filter( todo => !todo.completed );
        case 'completed': return allTodos.filter( todo => todo.completed );
        default: throw new Error(`Unknown filter: ${filter}`);
    };
};