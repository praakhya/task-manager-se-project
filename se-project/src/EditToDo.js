import logo from './logo.svg';
import React, { Component, useContext } from 'react';
import './ToDo.css'
import Button from '@mui/material/Button';
import { TextField, Card } from '@mui/material';
import axios from 'axios';
import { toDoContext } from './toDoContext';
class EditToDo extends Component {
    constructor(props) {
        super();
        this.state = {
            title: '',
            description: ''
        }
        this.changeTitle = this.changeTitle.bind(this)
        this.changeDesc = this.changeDesc.bind(this)
        this.newToDo = this.newToDo.bind(this)
        this.initToDoData = this.initToDoData.bind(this)
        this.updateToDoData = this.updateToDoData.bind(this)
        this.postToDo = this.postToDo.bind(this)
    }
    initToDoData(data) {
        this.context.setToDoData(data)
    }
    updateToDoData(data) {
        console.log("data in update: ",data)
        var oldList = this.context.toDoData
        var newdata = { title: data.title, description: data.description, done: data.done, _id: data._id }
        oldList.push(newdata)
        this.context.setToDoData(oldList)
    }
    postToDo() {
        console.log("in get ToDo");
        var baseUrl = "/api";
        var todo = { title: this.state.title, description: this.state.description };
        axios.post(baseUrl + '/load/todo', todo)
            .then(response => {
                console.log("response on edit: ", response)
                this.updateToDoData(response.data)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    changeTitle(e) {
        this.setState({ title: e.target.value })
    }
    changeDesc(e) {
        this.setState({ description: e.target.value })
    }
    newToDo() {
        console.log(this.state.title, this.state.description)
        this.postToDo()
        this.setState({ title: "", description: "" })
    }
    render() {
        console.log("edittodo render")

        return (
            <Card variant="outlined" id="card">
                <div className="EditToDo">
                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        size='small'
                        spellCheck="true"
                        value={this.state.title}
                        onChange={this.changeTitle} />
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Description"
                        multiline
                        minRows={5}
                        maxRows={5}
                        spellCheck="true"
                        value={this.state.description}
                        onChange={this.changeDesc}
                    />
                    <Button variant="outlined" id="editButton" onClick={this.newToDo}>Submit</Button>
                </div>
            </Card>
        );
    }
}
EditToDo.contextType = toDoContext
export default EditToDo
