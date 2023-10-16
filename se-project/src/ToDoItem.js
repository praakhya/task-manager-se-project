import logo from './logo.svg';
import './App.css';
import React, { Component, useState, setState } from 'react';
import './ToDo.css'
import { Button, Card, Checkbox } from '@mui/material';
import { toDoContext } from './toDoContext';
import axios from 'axios';
import { Inplace, InplaceDisplay, InplaceContent } from 'primereact/inplace';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { MdDelete } from "react-icons/md";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

class ToDoItem extends Component {
    static contextType = toDoContext;

    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.defaultDone,
            titleText: this.props.todo.title,
            descriptionText: this.props.todo.description
        }
        this.handleChange = this.handleChange.bind(this);
        this.toggleToDo = this.toggleToDo.bind(this);
        this.addCheckedToDo = this.addCheckedToDo.bind(this);

    }
    updateToDo(text, id, label) {
        console.log("in update ToDo: id=", id, "text=", text, "label=", label);
        var baseUrl = "/api";
        axios.put(baseUrl + '/load/ToDo/update', { "_id": id, [label]: text, "label": label })
            .then(response => {
                console.log("response on edit: ", response)
                this.addUpdatedToDo(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    setText(val, id, label) {
        console.log("val: ", val, "id: ", id, "label: ", label)
        this.updateToDo(val, id, label)
        if (label == "title") {
            this.setState({ "titleText": val })
        }
        else if (label == "description") {
            this.setState({ "descriptionText": val })
        }

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
    addUpdatedToDo(todo) {
        var list = this.context.toDoData;
        for (var i in list) {
            if (list[i]._id == todo._id) {
                list[i].title = todo.title
                list[i].description = todo.description
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

                    <div className="ToDoItem">
                        {/* <div class={textStyle}>
                            <div>{this.props.todo.title}</div>
                            <div>{this.props.todo.description}</div>
                        </div> */}
                        <div class={textStyle}>
                            <Inplace closable>
                                <InplaceDisplay >
                                    <div>
                                        <div>{this.state.titleText || this.props.todo.title}</div>
                                    </div>
                                </InplaceDisplay>
                                <InplaceContent>
                                    <InputText value={this.state.titleText} onChange={(e) => this.setText(e.target.value, this.props.todo._id, "title")} autoFocus />
                                </InplaceContent>
                            </Inplace>
                            <Inplace closable>
                                <InplaceDisplay >
                                    <div>
                                        <div>{this.state.descriptionText || this.props.todo.description}</div>
                                    </div>
                                </InplaceDisplay>
                                <InplaceContent>
                                    <InputTextarea value={this.state.descriptionText} onChange={(e) => this.setText(e.target.value, this.props.todo._id, "description")} autoFocus />
                                </InplaceContent>
                            </Inplace>
                        </div>
                        <div className='tools'>
                            <Checkbox
                                checked={this.state.checked}
                                onChange={this.handleChange} />
                            <IconButton aria-label="delete">
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    </div>
                </Card>
            );
        }
    }
}

ToDoItem.contextType = toDoContext
export default ToDoItem;