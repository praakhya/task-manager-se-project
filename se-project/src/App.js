import logo from './logo.svg';
import './App.css';
import ToDoList from './ToDoList.js';
import ToDoItem from './ToDoItem';
import EditToDo from './EditToDo';
import axios from "axios";
import { Component, createContext, useState } from 'react';
import { ToDoProvider, toDoContext } from './toDoContext';
import { useContext } from 'react';
class App extends Component {
  //This is the method to set the context data.
  setToDoData = (toDoData) => {
    this.setState({ toDoData });
  }
  state = {
    toDoData: [],
    setToDoData: this.setToDoData
  }
render() {
  
    return (
      <div className="App">
      <toDoContext.Provider value={this.state}>
        <EditToDo></EditToDo>
        <ToDoList/>
        </toDoContext.Provider>
      </div>
    );
  }
}

export default App;
