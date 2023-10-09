import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList.js';
import ToDoItem from './ToDoItem';
import EditToDo from './EditToDo';
import axios from "axios";
import { Component } from 'react';
import { ToDoProvider, toDoContext } from './toDoContext';
import { useContext } from 'react';
class App extends Component {
  state = {
    data: null
  };
  
  render() {
    return (
      <div className="App">
        <ToDoProvider value={[]}>
        <EditToDo></EditToDo>
        <ToDoList/>
        </ToDoProvider>
      </div>
    );
  }
}

export default App;
