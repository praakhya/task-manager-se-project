import ToDoList from './ToDoList.js';
import EditToDo from './EditToDo';
import { Component } from 'react';
import { ToDoProvider, toDoContext } from './toDoContext';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card } from '@mui/material';
import { MdExpandMore } from "react-icons/md";
import "./ToDo.css"

class ToDo extends Component {
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
                <Card className="ToDoFull">
                    <ToDoList disabled={false} defaultDone={false}/>
                    <Accordion className='completed'>
                        <AccordionSummary
                            expandIcon={<MdExpandMore />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Completed</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="completed">
                            <ToDoList disabled={true} defaultDone={true} />
                        </AccordionDetails>
                    </Accordion>
                </Card>
            </toDoContext.Provider>
        </div>)
    }
}
export default ToDo;