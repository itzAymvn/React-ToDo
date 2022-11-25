import "./App.css";

// React & React Router & Hooks
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

// Swal (SweetAlert2)
import Swal from "sweetalert2";

// Context
import tasksContext from "./Context/Tasks"; // context that hold the tasks array
import themeContext from "./Context/Theme"; // context that hold the theme

// Component
import RenderTasks from "./Components/RenderTasks"; // component that renders the tasks
import PendingTasks from "./Components/PendingTasks"; // component that renders the pending tasks
import CompletedTasks from "./Components/CompletedTasks"; // component that renders the completed tasks
import ScrollTopBtn from "./Components/ScrollTopBtn";

// React Bootstrap & CSS & Icons
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function App() {
    const [isScrolled, setIsScrolled] = useState(false); // state that holds the scroll status
    const [input, setInput] = useState(""); // State that holds the input value
    const [taskToAdd, setTaskToAdd] = useState(""); // state that holds the task to add= (ID, Content, Creation time & Status)
    const [tasks, setTasks] = useState(() => {
        const localData = localStorage.getItem("tasks");
        return localData ? JSON.parse(localData) : [];
    }); // state that holds the tasks array from the local storage (if exists), otherwise an empty array
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem("theme");
        return localTheme ? localTheme : "light";
    }); // state that holds the theme from the local storage (if exists), otherwise "light"

    document.title = `Tasks (${tasks.length})`; // set the title of the page to the number of tasks

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]); // if the tasks array changes, update the local storage

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]); // if the theme changes, update the local storage

    // Handle the click and enter events
    function handleClickAndEnter() {
        // if the task exists and its title is not empty
        if (taskToAdd && taskToAdd.taskTitle.replace(/\s/g, "").length > 0) {
            setTasks([...tasks, taskToAdd]); // add the task to the tasks array
            setTaskToAdd(""); // clear the taskToAdd state
            setInput(""); // clear the input
        } else {
            // if the task doesn't exist or its title is empty
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter a valid task!",
            });
        }
    }

    // Handle the scroll event
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    });

    return (
        /*
        Wrap the app with the theme context
        */
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
                        <Form title="Click to toggle between dark and light mode!">
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
                                    taskTitle: e.target.value.trim(),
                                    taskTime: new Date().toLocaleString(),
                                    taskCompleted: false,
                                }); // set the taskToAdd state to the value of the input
                            }}
                            //
                            // when the user presses enter
                            onKeyPress={(e) => {
                                e.key === "Enter" && handleClickAndEnter();
                            }}
                        />
                        <Button
                            title="Click to add the task!"
                            variant={
                                theme === "light"
                                    ? "outline-dark"
                                    : "outline-light"
                            }
                            id="button-addon2"
                            //
                            // when the user clicks the add button
                            onClick={() => handleClickAndEnter()}>
                            <i className="bi bi-plus-lg"></i>
                        </Button>
                    </InputGroup>
                </div>
                {
                    //
                    /* Wrap the tasks with the tasks context */
                }
                <tasksContext.Provider value={{ tasks, setTasks }}>
                    <Routes>
                        <Route path="/" element={<RenderTasks />} />
                        <Route path="/pending" element={<PendingTasks />} />
                        <Route path="/completed" element={<CompletedTasks />} />
                    </Routes>
                </tasksContext.Provider>
                {isScrolled ? (
                    <ScrollTopBtn scrolled={true} />
                ) : (
                    <ScrollTopBtn scrolled={false} />
                )}
            </div>
        </themeContext.Provider>
    );
}

export default App;
