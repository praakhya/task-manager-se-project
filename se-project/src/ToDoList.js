import logo from './logo.svg';
import React, { Component } from 'react';
import './ToDo.css'
import ToDoItem from './ToDoItem';

{/* <ToDoItem
            title="First"
            description="This is the first item" />,
          <ToDoItem
            title="Second"
            description="This is the second item" />,
          <ToDoItem
            title="Third"
            description="This is the third item" />,
        ]} */}
class ToDoList extends Component {
    constructor(props) {
        super();
        this.state = {list:[]}
    }
    getToDo() {
        console.log("in get ToDo");
        var baseUrl = "/api";
        fetch(baseUrl + '/load/todo', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json; charset=UTF-8'
          }
        })
          .then(response => {
    
            if (response.status != 200) {
              throw new Error(response.message);
            }
            console.log("immediated response: ",response)
            return response.json()
          })
          .then((response) => {
            console.log("response in getToDo: ", response);
            console.log("data: ", response);
            this.setItemList(response)            
          })
          .catch((err) => {
            console.log(err);
          });
      };
    setItemList(response) {
      var temp = []
      for (let todo of response) {
        temp.push({
          "title":todo.title,
          "description":todo.description,
          "done":todo.done
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
