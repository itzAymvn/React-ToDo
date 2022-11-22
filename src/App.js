import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

// context
import tasksContext from "./Context/Tasks"; // context that hold the tasks array
import themeContext from "./Context/Theme"; // context that hold the theme

// Component that renders the tasks
import RenderTasks from "./Components/RenderTasks"; // component that renders the tasks
import PendingTasks from "./Components/PendingTasks"; // component that renders the pending tasks
import CompletedTasks from "./Components/CompletedTasks"; // component that renders the completed tasks

// BOOTSTRAP CSS
import "bootstrap/dist/css/bootstrap.min.css";
// BOOTSTRAP ICONS
import "bootstrap-icons/font/bootstrap-icons.css";

// REACT BOOTSTRAP
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function App() {
    // STATES BEGIN //

    const [input, setInput] = useState(""); // input state

    const [taskToAdd, setTaskToAdd] = useState(""); // state that holds the task to add (directly from the input)

    const [tasks, setTasks] = useState(() => {
        const localData = localStorage.getItem("tasks");
        return localData ? JSON.parse(localData) : []; // if there is data in the local storage, return it, else return an empty array
    });

    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem("theme");
        return localTheme ? localTheme : "light";
    }); // state that holds the theme

    // STATES END //

    document.title = `Tasks (${tasks.length})`; // set the title of the page to the number of tasks

    // USE EFFECTS BEGIN

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // if the tasks array changes, update the local storage

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]); // if the theme changes, update the local storage

    // USE EFFECTS END

    // Handle the click and enter events
    function handleClickAndEnter() {
        if (taskToAdd) {
            setTasks([...tasks, taskToAdd]); // add the task to the tasks array
            setTaskToAdd(""); // clear the taskToAdd state
            setInput(""); // clear the input
        } else {
            alert("Please enter a task!");
        }
    }

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            <div
                className={
                    "min-100 container-fluid py-3 " +
                    (theme === "light" ? "" : "bg-dark bg-gradient text-light")
                }>
                <header>
                    <div className="d-flex justify-content-around align-items-center">
                        <Link to="/" className="text-decoration-none">
                            <h1 className="text-center">
                                <i className="bi bi-kanban mx-2"></i>Task
                                Manager
                            </h1>
                        </Link>
                        <Form>
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label={
                                    theme === "light" ? (
                                        <i className="bi bi-brightness-high"></i>
                                    ) : (
                                        <i className="bi bi-moon-fill"></i>
                                    )
                                }
                                checked={theme === "light" ? false : true}
                                onChange={() => {
                                    setTheme(
                                        theme === "light" ? "dark" : "light"
                                    );
                                }}
                            />
                        </Form>
                    </div>
                </header>
                <hr />
                <div className="AddTask">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Add a task..."
                            aria-label="Task"
                            aria-describedby="basic-addon2"
                            value={input}
                            //
                            // when the input changes, update the taskToAdd state
                            onChange={(e) => {
                                setInput(e.target.value);
                                setTaskToAdd({
                                    taskId: new Date().getTime(),
                                    taskTitle: input,
                                    taskTime: new Date().toLocaleString(),
                                    taskCompleted: false,
                                }); // set the taskToAdd state to the value of the input
                            }}
                            //
                            // when the user presses enter
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleClickAndEnter();
                                }
                            }}
                        />
                        <Button
                            variant={
                                theme === "light"
                                    ? "outline-dark"
                                    : "outline-light"
                            }
                            id="button-addon2"
                            //
                            // when the user clicks the add button
                            onClick={() => {
                                handleClickAndEnter();
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
        </themeContext.Provider>
    );
}

export default App;
