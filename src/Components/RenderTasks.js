import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";
import themeContext from "../Context/Theme";
import Task from "./Task";
import { Link } from "react-router-dom";

// sweet alert
import Swal from "sweetalert2";

// REACT BOOTSTRAP
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
const RenderTasks = () => {
    const { tasks } = useContext(tasksContext); // get the tasks array from the context
    const { theme } = useContext(themeContext); // get the theme from the context
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
                            Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    localStorage.removeItem("tasks");
                                    Swal.fire(
                                        "Deleted!",
                                        "Your tasks have been deleted.",
                                        "success"
                                    );
                                    window.location.reload();
                                }
                            });
                        }}>
                        Delete all tasks {tasks.length}
                    </button>

                    <button
                        className={
                            "btn m-2 " +
                            (theme === "light"
                                ? "btn-outline-dark"
                                : "btn-light")
                        }
                        onClick={() => {
                            Swal.fire({
                                title: "Are you sure you want to delete all pending tasks?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    localStorage.setItem(
                                        "tasks",
                                        JSON.stringify(
                                            tasks.filter(
                                                (task) =>
                                                    task.taskCompleted === true
                                            )
                                        )
                                    );
                                    Swal.fire(
                                        "Deleted!",
                                        "Your pending tasks have been deleted.",
                                        "success"
                                    );
                                    window.location.reload();
                                }
                            });
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
                            Swal.fire({
                                title: "Are you sure you want to delete all completed tasks?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    localStorage.setItem(
                                        "tasks",
                                        JSON.stringify(
                                            tasks.filter(
                                                (task) =>
                                                    task.taskCompleted === false
                                            )
                                        )
                                    );
                                    Swal.fire(
                                        "Deleted!",
                                        "Your completed tasks have been deleted.",
                                        "success"
                                    );
                                    window.location.reload();
                                }
                            });
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
