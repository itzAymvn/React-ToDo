import "./Task.css";

import React, { useContext, useState, useEffect } from "react";
import tasksContext from "../Context/Tasks"; // context that holds the tasks
import themeContext from "../Context/Theme";

// REACT BOOTSTRAP
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

// Swal
import Swal from "sweetalert2";

// Function that calculates the time difference between the current time and the task time and returns a string
const dateDifference = (date) => {
    if (new Date().getTime() - new Date(date).getTime() < 60000)
        // if the difference is less than a minute
        return "Just now";
    else if (new Date().getTime() - new Date(date).getTime() < 3600000)
        // if the difference is less than an hour
        return (
            Math.floor(
                (new Date().getTime() - new Date(date).getTime()) / 60000
            ) + "m ago"
        );
    else if (new Date().getTime() - new Date(date).getTime() < 86400000)
        // if the difference is less than a day
        return (
            // Hours and minutes
            Math.floor(
                (new Date().getTime() - new Date(date).getTime()) / 3600000
            ) +
            "h, " +
            Math.floor(
                ((new Date().getTime() - new Date(date).getTime()) % 3600000) /
                    60000
            ) +
            "m ago"
        );
    // if the difference is more than a day
    else
        return (
            // Days, hours and minutes
            Math.floor(
                (new Date().getTime() - new Date(date).getTime()) / 86400000
            ) +
            "d, " +
            Math.floor(
                ((new Date().getTime() - new Date(date).getTime()) % 86400000) /
                    3600000
            ) +
            "h, " +
            Math.floor(
                (((new Date().getTime() - new Date(date).getTime()) %
                    86400000) %
                    3600000) /
                    60000
            ) +
            "m ago"
        );
};

const Task = ({ task }) => {
    const [taskTitle, setTaskTitle] = useState(task.taskTitle); // state that holds the new task content
    const { theme } = useContext(themeContext); // get the theme from the context
    const { tasks, setTasks } = useContext(tasksContext); // get the tasks array and the setTasks function from the context
    const [showDiff, setShowDiff] = useState(true);
    const [editMode, setEditMode] = useState(false);

    // function that handles the task status change
    const handleChange = (e) => {
        task.taskCompleted = e.target.checked; // change the task status
        setTasks([...tasks]); // update the tasks array
    };

    // function to edit the task
    const editTask = (taskId) => {
        if (taskTitle.replace(/\s/g, "").length > 0) {
            setTasks(
                tasks.map((t) => {
                    if (t.taskId === taskId) t.taskTitle = taskTitle;
                    return t;
                })
            );
            setEditMode(false);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Task content can't be empty!",
            });
        }
    };

    useEffect(() => {
        // Immediately animate the tasks that are in the viewport when the page loads
        document.querySelectorAll(".task").forEach((task) => {
            if (task.getBoundingClientRect().top < window.innerHeight) {
                task.classList.add("visible"); // add the visible class to the task
            }
        });
    });

    useEffect(() => {
        // Animate the tasks as the user scrolls the page
        window.addEventListener("scroll", () => {
            document.querySelectorAll(".task").forEach((task) => {
                if (task.getBoundingClientRect().top < window.innerHeight) {
                    task.classList.add("visible"); // add the visible class to the task
                } else {
                    task.classList.remove("visible"); // remove the visible class from the task
                }
            });
        });
    }, []);

    return (
        <Card
            border={theme === "light" ? "dark" : "danger"} // change the border color according to the theme
            bg={
                task.taskCompleted
                    ? "success"
                    : theme === "light"
                    ? "light"
                    : "dark"
            } // change the background color according to the theme and the task status
            className={"task my-3 " + (task.taskCompleted && "text-white")}>
            <Card.Header as="div">
                <Form.Check
                    type="checkbox"
                    label={task.taskCompleted ? "Completed!" : "Pending..."} // change the label according to the task status
                    checked={task.taskCompleted}
                    onChange={(e) => handleChange(e)}
                    title={
                        "Click the checkbox to mark this task as " +
                        (task.taskCompleted ? "pending" : "completed")
                    }
                />
            </Card.Header>
            <Card.Body>
                {!editMode ? (
                    <Card.Text as="div">{task.taskTitle}</Card.Text>
                ) : (
                    <InputGroup className="mb-3">
                        <Form.Control
                            value={taskTitle}
                            onChange={
                                (e) => setTaskTitle(e.target.value) // update the new task content
                            }
                            onKeyPress={(e) => {
                                if (e.key === "Enter") editTask(task.taskId);
                            }}
                        />
                        <Button
                            title="Edit task"
                            onClick={() => editTask(task.taskId)}
                            variant={
                                theme === "light"
                                    ? "outline-dark"
                                    : "outline-light"
                            }>
                            <i className="bi bi-pencil"></i>
                        </Button>
                    </InputGroup>
                )}
            </Card.Body>
            <Card.Footer className={"d-flex justify-content-between"}>
                <div className="icons d-flex gap-1">
                    <i
                        onClick={() =>
                            setTasks(tasks.filter((t) => t !== task))
                        }
                        title="Delete task"
                        className="bi bi-trash"></i>
                    <i
                        title="Edit task"
                        onClick={() => setEditMode(!editMode)}
                        className="bi bi-pencil"></i>
                </div>
                <div className={"taskTime align-self-end"}>
                    {showDiff ? dateDifference(task.taskTime) : task.taskTime}
                    <i
                        onClick={() => setShowDiff(!showDiff)}
                        title={
                            "Click to see " +
                            (showDiff ? "creation time" : "task age")
                        }
                        className="bi bi-clock-history mx-2"></i>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Task;
