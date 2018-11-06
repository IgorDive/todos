import todo from './todo'

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO': return [...state, todo(undefined, action),];
        case 'TOGGLE_TODO': return state.map(t => todo(t, action));
        default: return state;
    }
};
 
export default todos;

export const getVisibleTodos = (state, filter) => {
    let visibleTodos = state.filter( todo => {
        switch(filter) {
            case 'all': return state;
            case 'active': return !todo.completed;
            case 'completed': return todo.completed;
            default: throw new Error(`Unknown filter: ${filter}`);
        }
    } );
    
    return visibleTodos; 
}