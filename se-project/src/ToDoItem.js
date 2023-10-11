import logo from './logo.svg';
import './App.css';
import React, { Component, useState, setState } from 'react';
import './ToDo.css'
import { Card, Checkbox } from '@mui/material';
import { toDoContext } from './toDoContext';
import axios from 'axios';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
        
class ToDoItem extends Component {
    static contextType = toDoContext;

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.defaultDone,
            text: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.addCheckedToDo = this.addCheckedToDo.bind(this);

    }
    setText(val) {
        this.setState({text: val})
    }
    addCheckedToDo(todo) {
        var list = this.context.toDoData;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                list[i].done = todo.done
            }
        }
        this.context.setToDoData(list)
        console.log(this.context.toDoData)

    }
    toggleToDo(id, done) {
        console.log("in complete ToDo: ", id, done);
        var baseUrl = "/api";
        axios.put(baseUrl + '/load/todo/complete', { "_id": id, "done": done })
            .then(response => {
                console.log("response on edit: ", response)
                this.addCheckedToDo(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    handleChange() {
        var newDone = !this.state.checked
        this.setState({ checked: newDone });
        console.log("NEW CHECK: ", this.state.checked)
        this.toggleToDo(this.props.todo._id, newDone)
    }
    render() {
        var textStyle = "toDoText"
        if (this.state.checked == true) {
            textStyle = "toDoText disabled"
        }
        if (this.state.checked == this.props.defaultDone) {
            return (
                <Card variant="outlined" id="card">
                    <Inplace closable>
                        <InplaceDisplay>{this.state.text || 'Click to Edit'}</InplaceDisplay>
                        <InplaceContent>
                            <InputText value={this.state.text} onChange={(e) => this.setText(e.target.value)} autoFocus />
                        </InplaceContent>
                    </Inplace>
                    <div className="ToDoItem">
                        <div class={textStyle}>
                            <div>{this.props.todo.title}</div>
                            <div>{this.props.todo.description}</div>
                        </div>
                        <Checkbox
                            checked={this.state.checked}
                            onChange={this.handleChange} />
                    </div>
                </Card>
            );
        }
    }
}

ToDoItem.contextType = toDoContext
export default ToDoItem;