// React & Hooks
import React, { useContext } from "react";

// Components
import Task from "./Task"; // Component that renders each task
import DeleteButtons from "./DeleteButtons"; // Component that renders the delete buttons
import tasksContext from "../Context/Tasks"; // Component that holds the context

// React Router DOM
import { Link } from "react-router-dom";

// REACT BOOTSTRAP
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

const RenderTasks = () => {
    // get the tasks array from the context
    const { tasks } = useContext(tasksContext);

    // sort tasks by creation time, so that the latest tasks are on top
    let sortedTasks = tasks.sort((a, b) => {
        return new Date(b.taskTime) - new Date(a.taskTime);
    });

    // Get the pending tasks
    let pendingTasks = sortedTasks.filter(
        (task) => task.taskCompleted === false
    );

    // Get the completed tasks
    let completedTasks = sortedTasks.filter(
        (task) => task.taskCompleted === true
    );

    return (
        <div className="tasks">
            {sortedTasks.length > 0 ? ( // if the tasks array is not empty
                <>
                    <Alert variant="success">
                        <Alert.Heading>Tasks waiting for you!</Alert.Heading>
                        <p>You have {tasks.length} tasks to do.</p>
                    </Alert>

                    <Alert
                        variant="warning"
                        className="d-flex justify-content-around">
                        {
                            // Render the number of pending tasks if there are any
                            pendingTasks.length > 0 ? (
                                <Link to="/pending">
                                    <Badge bg="light text-dark" className="p-2">
                                        View {pendingTasks.length} Pending
                                    </Badge>
                                </Link>
                            ) : null
                        }
                        {
                            // Render the number of completed tasks if there are any
                            completedTasks.length > 0 ? (
                                <Link to="/completed">
                                    <Badge bg="success" className="p-2">
                                        View {completedTasks.length} Completed
                                    </Badge>
                                </Link>
                            ) : null
                        }
                    </Alert>

                    <hr />
                    <h1 className="text-center">
                        <i className="bi bi-list-task mx-2"></i>Your tasks
                    </h1>
                    <hr />

                    {sortedTasks.length > 0 && // This will render the tasks if the tasks array is not empty
                        sortedTasks.map((task, index) => {
                            return (
                                <Task key={index} task={task} index={index} />
                            );
                        })}
                    <DeleteButtons />
                </>
            ) : (
                // This will render if the tasks array is empty
                <Alert variant="danger">
                    <Alert.Heading>No tasks!</Alert.Heading>
                    <p>You have no tasks to do. That's great!</p>
                </Alert>
            )}
        </div>
    );
};

export default RenderTasks;
