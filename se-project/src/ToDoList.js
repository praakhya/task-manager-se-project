import logo from './logo.svg';
import React, { Component } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';
import axios from 'axios';
import { toDoContext } from './toDoContext';

class ToDoList extends Component {
    constructor(props) {
        super();
        this.state = {list:[]}
        this.getToDo = this.getToDo.bind(this)
        this.initToDoData = this.initToDoData.bind(this)
        this.setItemList = this.setItemList.bind(this)
    }
    getToDo() {
        console.log("in get ToDo");
        var baseUrl = "/api";
        axios.get(baseUrl+'/load/todo')
        .then(response => {
          if (response.status != 200) {
            throw new Error(response.message);
          }
          //console.log("immediated response: ",response)
          return response.data})
        .then(data=>{
          console.log("data: ",data)
          this.setItemList(data) 
        })
        .catch((err) => {
          console.log(err);
        });
    }
    initToDoData(data){
      console.log("init data: ",data)
      this.context.setToDoData(data)
      console.log("toDo state var: ",this.context.toDoData)
    }
    setItemList(response) {
      var temp = []
      for (let todo of response) {
        temp.push({
          "title":todo.title,
          "description":todo.description,
          "done":todo.done,
          "_id":todo.id
        })
      }
      this.initToDoData(temp)
      this.setState({list:temp})
      console.log("context var: ",this.context)
    }
    componentDidMount() {
      console.log("before getToDo")
      this.getToDo()
      console.log("ToDoList mounted")
    }
    render() {
        if (!this.state.list) {
          return (<div></div>)
        }
        else {
          var itemList = []
          for (let todo of this.state.list){
            itemList.push(<ToDoItem title={todo.title} description={todo.description} done={todo.done}/>)
          }
          console.log("itemList: ",itemList)
          return (
              <div className="ToDoList">
              {itemList}
              </div>
          );
        }
        
    }
  }

ToDoList.contextType = toDoContext
export default ToDoList