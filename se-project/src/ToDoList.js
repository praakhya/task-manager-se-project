import logo from './logo.svg';
import React, { Component } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';
import axios from 'axios';


class ToDoList extends Component {
    constructor(props) {
        super();
        this.state = {list:[]}
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
      this.setState({list:temp});
      console.log("list: ",this.state.list)
    }
    componentDidMount() {
      console.log("before getToDo")
      this.getToDo()
      console.log("ToDoList mounted")
    }
    render() {
        var itemList = []
        for (let todo of this.state.list){
          itemList.push(<ToDoItem title={todo.title} description={todo.description} done={todo.done}/>)
        }
        console.log("itemList: ",itemList)
        return (
          [
            <div className="ToDoList">
            {itemList}
            </div>,
            <p>ToDoList</p>
          ]
        );
    }
  }
export default ToDoList
