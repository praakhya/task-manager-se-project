import logo from './logo.svg';
import React, { Component } from 'react';
import './ToDo.css'
import Button from '@mui/material/Button';
import { TextField, Card } from '@mui/material';


class EditToDo extends Component {
    constructor(props) {
        super();
    }
    render() {
        return (
            <Card variant="outlined" id="card">
            <div className="EditToDo">
                <TextField 
                    id="standard-basic" 
                    label="Title" 
                    variant="standard" 
                    size='small' 
                    spellCheck="true"/>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Description"
                    multiline
                    minRows={5}
                    maxRows={5}
                    spellCheck="true"
                />
                <Button variant="outlined" id="editButton">Submit</Button>
            </div>
            </Card>
        );
    }
  }
export default EditToDo
