import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching } from '../reducers';
import TodoList from './TodoList';


class VisibleTodoList extends Component {

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            this.fetchData();
        }
    }

    fetchData() {
        const {filter, requestTodos, fetchTodos} = this.props;
        requestTodos(filter);
        fetchTodos(filter);
    }

    render() {
        const {toggleTodo, todos, isFetching} = this.props;

        if (isFetching && !todos.length) {
            return <p>Loading...</p>
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo} />
    }
}

const mapStateToTodoListProps = (state, {match}) => {
    const filter = match.params.filter || 'all';

    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        filter
    }
};

// const mapDispatchToTodoListProps = (dispatch) => ({
//         onTodoClick(id) {
//             dispatch(toggleTodo(id));
//         },
// });

VisibleTodoList = withRouter( connect(
    mapStateToTodoListProps,
    actions
)(VisibleTodoList) );

export default VisibleTodoList;
