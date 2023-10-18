import ToDoList from './ToDoList.js';
import EditToDo from './EditToDo';
import { Component } from 'react';
import { ToDoProvider, toDoContext } from './toDoContext';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Card, Tab, Box, Button } from '@mui/material';
import { MdExpandMore, MdNoteAdd, MdClose } from "react-icons/md";
import "./ToDo.css"
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';


class ToDo extends Component {
    setToDoData = (toDoData) => {
        this.setState({ toDoData });
    }
    setView = (view) => {
        this.setState({ view })
    }
    setAddMode = (addMode) => {
        this.setState({ addMode })
    }
    state = {
        toDoData: [],
        view: "1",
        addMode: 0
    }
    renderEdit = () => {
        if (this.state.addMode) {
            return (<EditToDo></EditToDo>)
        }
    }
    render() {
        return (
            <div className="App">
                <toDoContext.Provider value={{ toDoData: this.state.toDoData, setToDoData: this.setToDoData, showEdit: this.state.addMode, toggleEdit: this.setAddMode }}>
                    <Card className="ToDoFull">
                        <Button variant="outline" sx={{color: "black", fontSize: "1em"}} onClick={() => {
                            this.setAddMode(!this.state.addMode)
                        }}>
                            <MdNoteAdd />
                        </Button>
                        <TabContext value={this.state.view}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList 
                                onChange={(event, newValue) => {
                                    this.setState({ view: newValue })
                                }} 
                                aria-label="lab API tabs example"
                                TabIndicatorProps={{
                                    sx: {
                                        color: "var(--dark-green)",
                                    },
                                  }}>
                                    <Tab label="Incomplete" value="1" />
                                    <Tab label="Completed" value="2" />
                                </TabList>
                            </Box>
                            {
                                this.renderEdit()
                            }
                            <TabPanel value="1">
                                <ToDoList disabled={false} defaultDone={false} />
                            </TabPanel>
                            <TabPanel value="2">
                                <ToDoList disabled={true} defaultDone={true} />
                            </TabPanel>
                        </TabContext>



                    </Card>
                </toDoContext.Provider>
            </div>)
    }
}
export default ToDo;