import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList.js';
import ToDoItem from './ToDoItem';
import EditToDo from './EditToDo';
import axios from "axios";
import { Component } from 'react';
class App extends Component {
  state = {
    data: null
  };
  
  render() {
    return (
      <div className="App">
        <EditToDo></EditToDo>
        <ToDoList/>
      </div>
    );
  }
}

export default App;
