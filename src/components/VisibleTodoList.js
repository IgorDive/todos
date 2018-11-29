import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { toggleTodo } from '../actions/index';
import { getVisibleTodos } from '../reducers';
import TodoList from './TodoList';
import { fetchTodos } from '../api';

class VisibleTodoList extends Component {

    componentDidMount() {
        fetchTodos(this.props.filter)
            .then( todos => console.log(this.props.filter, todos))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filter !== this.props.filter) {
            fetchTodos(this.props.filter)
                .then( todos => console.log(this.props.filter, todos))
        }
    }

    render() {
        return <TodoList {...this.props} />
    }
}

const mapStateToTodoListProps = (state, {match}) => {
    const filter = match.params.filter || 'all';

    return {
        todos: getVisibleTodos(state, filter),
        filter
    }
};

const mapDispatchToTodoListProps = (dispatch) => ({
        onTodoClick(id) {
            dispatch(toggleTodo(id));
        },
});

VisibleTodoList = withRouter( connect(
    mapStateToTodoListProps,
    mapDispatchToTodoListProps
)(VisibleTodoList) );

export default VisibleTodoList;
