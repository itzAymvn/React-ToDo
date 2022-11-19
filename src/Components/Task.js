import React, { useContext } from "react";
import tasksContext from "../Context/Tasks"; // context that holds the tasks
import themeContext from "../Context/Theme";

// REACT BOOTSTRAP
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Task = ({ task }) => {
    const { theme } = useContext(themeContext); // get the theme from the context
    // task is the task object that contains the task title, time and status
    const { tasks, setTasks } = useContext(tasksContext); // get the tasks array and the setTasks function from the context

    // function that handles the task status change
    const handleChange = (e) => {
        if (e.target.checked) {
            // if the checkbox is checked
            e.target.parentElement.classList.add("checked"); // add the checked class to the task
            task.taskCompleted = true; // change the task status to true
            setTasks([...tasks]); // update the tasks array
        } else {
            // if the checkbox is unchecked
            e.target.parentElement.classList.remove("checked"); // remove the checked class from the task
            task.taskCompleted = false; // change the task status to false
            setTasks([...tasks]); // update the tasks array
        }
    };
    return (
        <Card
            border={theme === "light" ? "dark" : "danger"}
            bg={
                task.taskCompleted
                    ? "success"
                    : theme === "light"
                    ? "light"
                    : "dark"
            } // if the theme is dark, set the card bg to dark
            className={task.taskCompleted ? "task checked my-3" : "task my-3"}>
            <Card.Header as="div">
                <Form.Check
                    type="checkbox"
                    label={task.taskCompleted ? "Completed!" : "Pending..."}
                    checked={task.taskCompleted}
                    onChange={(e) => {
                        handleChange(e);
                    }}
                />
            </Card.Header>
            <Card.Body>
                <Card.Text as="div">{task.taskTitle}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">
                <div
                    className={
                        "d-flex justify-content-between text-" +
                        (theme === "light" ? "dark" : "light")
                    }>
                    <i
                        onClick={() => {
                            setTasks(tasks.filter((t) => t !== task));
                        }}
                        className="bi bi-trash"></i>
                    <div
                        className={
                            "taskTime align-self-end text-" +
                            (theme === "light" ? "dark" : "light")
                        }>
                        {task.taskTime}
                    </div>
                </div>
            </Card.Footer>
        </Card>
    );
};

export default Task;
