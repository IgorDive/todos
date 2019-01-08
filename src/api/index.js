import { v4 } from 'node-uuid';

const fakeDatabase = {
    todos: [
        {
            id: v4(),
            text: 'hey',
            completed: true
        },
        {
            id: v4(),
            text: 'ho',
            completed: false
        },
        {
            id: v4(),
            text: 'let\'s go',
            completed: true
        },
    ]
};

const delay = (ms) =>
    new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = (filter) =>
    delay(1000).then( () => {       
        //if (Math.random() > 0.7) throw new Error('Boom!');
        
        switch (filter) {
                case 'all': return fakeDatabase.todos;
                case 'active': return fakeDatabase.todos.filter( todo => !todo.completed );
                case 'completed': return fakeDatabase.todos.filter( todo => todo.completed );
                default: new Error(`Unknown filter: ${filter}`);
        }
    });

export const addTodo = (text) => 
    delay(500).then (() => {
        const todo = {
            id: v4(),
            text,
            completed: false,
        };
        fakeDatabase.todos.push(todo);

        return todo;
    });

export const toggleTodo = (id) => 
    delay(500).then(() => {
        const todo = fakeDatabase.todos.find(t => t.id === id);
        todo.completed = !todo.completed;

        return todo;
    });