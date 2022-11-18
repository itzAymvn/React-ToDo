import React, { useContext } from "react";
import tasksContext from "../Context/Tasks"; // context that holds the tasks

// REACT BOOTSTRAP
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";

const Task = ({ task }) => {
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
            bg={task.taskCompleted ? "info" : "light"} // if the task is done, set the card background to info, else set it to light
            className={
                task.taskCompleted
                    ? "task checked my-3"
                    : "task my-3" /* if the task is done, add the checked class to the task, else don't */
            }>
            <Card.Body>
                <Form.Check
                    type="checkbox"
                    label={task.taskCompleted ? "Completed!" : "Pending..."} // if the task is done, set the checkbox label to Completed, else set it to Pending
                    checked={
                        task.taskCompleted /* if the task is done, check the checkbox, else don't */
                    }
                    onChange={(e) => {
                        handleChange(e);
                    }}
                    className="task-checkbox mb-4"
                />
                <hr />
                <Card.Title>{task.taskTitle}</Card.Title>
                <hr />
                <Card.Text as="div" className="mt-4">
                    <div className="d-flex justify-content-between">
                        <button
                            onClick={() => {
                                // if the delete button is clicked
                                setTasks(tasks.filter((t) => t !== task)); // remove the task from the tasks array
                            }}
                            className="btn btn-danger">
                            Delete
                        </button>
                        <div className="taskTime align-self-end">
                            {task.taskTime}
                        </div>
                    </div>
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Task;
