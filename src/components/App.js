import React, { Fragment } from 'react';
//import logo from '../logo.svg';
//import './App.css';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const App = () => (
  <Fragment>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </Fragment>   
);

export default App;
