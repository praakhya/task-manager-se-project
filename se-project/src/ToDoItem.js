import logo from './logo.svg';
import './App.css';
import React, { Component, useState, setState } from 'react';
import './ToDo.css'
import { Card, Checkbox } from '@mui/material';

class ToDoItem extends Component {
    constructor(props) {
        super();
        this.state = {
            checked:false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.setState({checked:!this.state.checked});
        
    }
    render() {
        if (!this.state.checked) {
            return (
            <Card variant="outlined" id="card">
            <div className="ToDoItem">
                <div class="toDoText">
                    <div>{this.props.title}</div>
                    <div>{this.props.description}</div>
                </div>
                <Checkbox 
                    checked={this.state.checked}
                    onChange={this.handleChange}/>
            </div>
            </Card>
            );
        }
    }
  }
export default ToDoItem;
