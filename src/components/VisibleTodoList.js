import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/index';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';

const mapStateToTodoListProps = (state, {match}) => ({
        todos: getVisibleTodos(state, match.params.filter || 'all')
});

const mapDispatchToTodoListProps = (dispatch) => ({
        onTodoClick(id) {
            dispatch(toggleTodo(id));
        },
});

const VisibleTodoList = withRouter( connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(TodoList) );

export default VisibleTodoList;
