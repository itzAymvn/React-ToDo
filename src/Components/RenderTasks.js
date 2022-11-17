import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";
import Task from "./Task";
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
                    <Alert variant="info">
                        <div className="d-flex justify-content-around">
                            <Link to="/pending">
                                <Badge bg="light text-dark">
                                    View{" "}
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.taskCompleted === false
                                        ).length
                                    }{" "}
                                    Pending
                                </Badge>
                            </Link>
                            <Link to="/completed">
                                <Badge bg="info">
                                    View{" "}
                                    {
                                        tasks.filter(
                                            (task) =>
                                                task.taskCompleted === true
                                        ).length
                                    }{" "}
                                    Completed
                                </Badge>
                            </Link>
                        </div>
                    </Alert>
                    <hr />
                    <h1 className="text-center">
                        <i className="bi bi-list-task mx-2"></i>Your tasks
                    </h1>
                    <hr />
                    {tasks.length > 0 &&
                        tasks.map((task, index) => {
                            return (
                                <Task key={index} task={task} index={index} />
                            );
                        })}
                    <button
                        className="btn btn-danger m-2"
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}>
                        Delete all tasks {tasks.length}
                    </button>

                    <button
                        className="btn btn-outline-dark m-2"
                        onClick={() => {
                            localStorage.setItem(
                                "tasks",
                                JSON.stringify(
                                    tasks.filter(
                                        (task) => task.taskCompleted === true
                                    )
                                )
                            );
                            window.location.reload();
                        }}>
                        Delete all pending tasks{" "}
                        {
                            tasks.filter((task) => task.taskCompleted === false)
                                .length
                        }
                    </button>

                    <button
                        className="btn btn-info m-2"
                        onClick={() => {
                            localStorage.setItem(
                                "tasks",
                                JSON.stringify(
                                    tasks.filter(
                                        (task) => task.taskCompleted === false
                                    )
                                )
                            );
                            window.location.reload();
                        }}>
                        Delete all completed tasks{" "}
                        {
                            tasks.filter((task) => task.taskCompleted === true)
                                .length
                        }
                    </button>
                </>
            ) : (
                <Alert variant="danger">
                    <Alert.Heading>No tasks!</Alert.Heading>
                    <p>You have no tasks to do. That's great!</p>
                </Alert>
            )}
        </div>
    );
};

export default RenderTasks;
