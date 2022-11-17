import "./App.css";
import React, { useState, useEffect } from "react";
import tasksContext from "./Context/Tasks"; // context that hold the tasks array
import RenderTasks from "./Components/RenderTasks"; // component that renders the tasks
import { Routes, Route, Link } from "react-router-dom";

import PendingTasks from "./Components/PendingTasks";
import CompletedTasks from "./Components/CompletedTasks";

// BOOTSTRAP CSS
import "bootstrap/dist/css/bootstrap.min.css";
// BOOTSTRAP ICONS
import "bootstrap-icons/font/bootstrap-icons.css";

// REACT BOOTSTRAP
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
    const [taskToAdd, setTaskToAdd] = useState(""); // state that holds the task to add (directly from the input)
    const [tasks, setTasks] = useState(() => {
        // state that holds the tasks array
        const localData = localStorage.getItem("tasks");
        return localData ? JSON.parse(localData) : []; // if there is data in the local storage, return it, else return an empty array
    });

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // if the tasks array changes, update the local storage

    return (
        <div className="container-fluid py-3">
            <Link to="/" className="text-decoration-none">
                <h1 className="text-center">
                    <i className="bi bi-kanban mx-2"></i>Task Manager
                </h1>
            </Link>
            <hr />
            <div className="AddTask">
                <InputGroup className="mb-3">
                    <Form.Control
                        placeholder="Type your todo task here..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        onChange={(e) => {
                            setTaskToAdd({
                                taskId: new Date().getTime(),
                                taskTitle: e.target.value,
                                taskTime: new Date().toLocaleString(),
                                taskCompleted: false,
                            }); // set the taskToAdd state to the value of the input
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                // if the user presses enter
                                setTasks([...tasks, taskToAdd]); // add the task to the tasks array
                                setTaskToAdd(""); // clear the taskToAdd state
                                e.target.value = ""; // clear the input
                            }
                        }}
                    />
                    <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        onClick={() => {
                            setTasks([...tasks, taskToAdd]); // add the task to the tasks array
                            setTaskToAdd(""); // clear the taskToAdd state
                            document.querySelector(".AddTask input").value = "";
                        }}>
                        <i className="bi bi-plus-lg"></i>
                    </Button>
                </InputGroup>
            </div>
            <tasksContext.Provider value={{ tasks, setTasks }}>
                <Routes>
                    <Route path="/" element={<RenderTasks />} />
                    <Route path="/pending" element={<PendingTasks />} />
                    <Route path="/completed" element={<CompletedTasks />} />
                </Routes>
            </tasksContext.Provider>
        </div>
    );
}

export default App;
