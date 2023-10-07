import logo from './logo.svg';
import React, { Component } from 'react';
import './ToDo.css'


class ToDoList extends Component {
    constructor(props) {
        super();
        this.list=[]
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
            return response.json()
          })
          .then((response) => {
            console.log("response in getToDo: ", response);
            console.log("data: ", response);
            this.list = response;
          })
          .catch((err) => {
            console.log(err);
          });
      };
    render() {
        return (
            <div className="ToDoList">
            {this.list}
            </div>
        );
    }
  }
export default ToDoList
