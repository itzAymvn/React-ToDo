import "./Task.css";

import React, { useContext, useState, useEffect } from "react";
import tasksContext from "../Context/Tasks"; // context that holds the tasks
import themeContext from "../Context/Theme";

// REACT BOOTSTRAP
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

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
    const { theme } = useContext(themeContext); // get the theme from the context
    const { tasks, setTasks } = useContext(tasksContext); // get the tasks array and the setTasks function from the context
    const [showDiff, setShowDiff] = useState(true);

    // function that handles the task status change
    const handleChange = (e) => {
        task.taskCompleted = e.target.checked; // change the task status
        setTasks([...tasks]); // update the tasks array
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
            className={task.taskCompleted ? "task checked my-3" : "task my-3"}>
            <Card.Header as="div">
                <Form.Check
                    type="checkbox"
                    label={task.taskCompleted ? "Completed!" : "Pending..."} // change the label according to the task status
                    checked={task.taskCompleted}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    title={
                        "Click the checkbox to mark this task as " +
                        (task.taskCompleted ? "pending" : "completed")
                    }
                />
            </Card.Header>
            <Card.Body>
                <Card.Text as="div">{task.taskTitle}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div
                    className={
                        "d-flex justify-content-between text-" +
                        (theme === "light" ? "dark" : "light") // change the text color according to the theme
                    }>
                    <i
                        onClick={() => {
                            setTasks(tasks.filter((t) => t !== task));
                        }}
                        title="Delete this task"
                        className="bi bi-trash"></i>
                    <div
                        className={
                            "taskTime align-self-end text-" +
                            (theme === "light" ? "dark" : "light") // change the text color according to the theme
                        }>
                        {showDiff
                            ? dateDifference(task.taskTime)
                            : task.taskTime}

                        <i
                            onClick={() => {
                                setShowDiff(!showDiff);
                            }}
                            title="Click to see the exact time"
                            className="bi bi-clock-history mx-2"></i>
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Task;
