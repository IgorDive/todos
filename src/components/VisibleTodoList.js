import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { getVisibleTodos, getIsFetching, getErrorMessage } from '../reducers';
import TodoList from './TodoList';
import FetchError from './FetchError';


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
        const {filter, fetchTodos} = this.props;
        
        fetchTodos(filter).then(() => console.log('done!'));
    }

    render() {
        const {toggleTodo, errorMessage, todos, isFetching} = this.props;

        if (isFetching && !todos.length) {
            return <p>Loading...</p>;
        }

        if (errorMessage && !todos.length) {
            return <FetchError message={errorMessage} onRetry={() => this.fetchData()} />;
        }

        return <TodoList todos={todos} onTodoClick={toggleTodo} />;
    }
}

const mapStateToTodoListProps = (state, {match}) => {
    const filter = match.params.filter || 'all';

    return {
        todos: getVisibleTodos(state, filter),
        isFetching: getIsFetching(state, filter),
        errorMessage: getErrorMessage(state, filter),
        filter,
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
