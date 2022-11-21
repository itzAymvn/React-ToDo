import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";

// Components
import Task from "./Task"; // Task component
import DeleteButtons from "./DeleteButtons"; // DeleteButtons component

// React Router DOM
import { Link } from "react-router-dom";

// REACT BOOTSTRAP
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";

const RenderTasks = () => {
    const { tasks } = useContext(tasksContext); // get the tasks array from the context
    return (
        <div className="tasks">
            {tasks.length > 0 ? ( // if the tasks array is not empty
                <>
                    <Alert variant="success">
                        <Alert.Heading>Tasks waiting for you!</Alert.Heading>
                        <p>You have {tasks.length} tasks to do.</p>
                    </Alert>

                    <Alert variant="warning">
                        <div className="d-flex justify-content-around">
                            {
                                // Render the number of pending tasks if there are any
                                tasks.filter(
                                    (task) => task.taskCompleted === false
                                ).length > 0 ? (
                                    <Link to="/pending">
                                        <Badge
                                            bg="light text-dark"
                                            className="p-2">
                                            View{" "}
                                            {
                                                tasks.filter(
                                                    (task) =>
                                                        task.taskCompleted ===
                                                        false
                                                ).length
                                            }{" "}
                                            Pending
                                        </Badge>
                                    </Link>
                                ) : null
                            }
                            {
                                // Render the number of completed tasks if there are any
                                tasks.filter(
                                    (task) => task.taskCompleted === true
                                ).length > 0 ? (
                                    <Link to="/completed">
                                        <Badge bg="success" className="p-2">
                                            View{" "}
                                            {
                                                tasks.filter(
                                                    (task) =>
                                                        task.taskCompleted ===
                                                        true
                                                ).length
                                            }{" "}
                                            Completed
                                        </Badge>
                                    </Link>
                                ) : null
                            }
                        </div>
                    </Alert>

                    <hr />
                    <h1 className="text-center">
                        <i className="bi bi-list-task mx-2"></i>Your tasks
                    </h1>
                    <hr />

                    {tasks.length > 0 && // This will render the tasks if the tasks array is not empty
                        tasks.map((task, index) => {
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
