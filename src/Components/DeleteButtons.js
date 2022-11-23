import React, { useContext } from "react";

// Context
import tasksContext from "../Context/Tasks";
import themeContext from "../Context/Theme";

// Bootstrap Imports
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

// Sweet Alert
import Swal from "sweetalert2";

const DeleteButtons = () => {
    const { tasks, setTasks } = useContext(tasksContext); // get the tasks array from the context
    const { theme } = useContext(themeContext); // get the theme from the context

    return (
        <div className="controlButtons">
            <Dropdown as={ButtonGroup}>
                <Button variant="danger">Delete Tasks</Button>
                <Dropdown.Toggle
                    split
                    variant="danger"
                    id="dropdown-split-basic"
                />
                <Dropdown.Menu variant={theme}>
                    {/* Button to delete all tasks */}
                    <Dropdown.Item
                        as="button"
                        onClick={() => {
                            Swal.fire({
                                // Sweet Alert to confirm the deletion
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    // if the user confirms the deletion
                                    localStorage.removeItem("tasks");
                                    Swal.fire(
                                        "Deleted!",
                                        "Your tasks have been deleted.",
                                        "success"
                                    );
                                    // empty the tasks array
                                    setTasks([]);
                                }
                            });
                        }}>
                        All ({tasks.length})
                    </Dropdown.Item>

                    {/* Button to delete all completed tasks */}
                    {tasks.filter((task) => task.taskCompleted === false)
                        .length > 0 && (
                        <Dropdown.Item
                            as="button"
                            onClick={() => {
                                Swal.fire({
                                    // Sweet Alert to confirm the deletion
                                    title: "Are you sure you want to delete all pending tasks?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // if the user confirms the deletion
                                        localStorage.setItem(
                                            "tasks",
                                            JSON.stringify(
                                                tasks.filter(
                                                    (task) =>
                                                        task.taskCompleted ===
                                                        true
                                                )
                                            )
                                        );
                                        Swal.fire(
                                            "Deleted!",
                                            "Your pending tasks have been deleted.",
                                            "success"
                                        );

                                        // Remove all pending tasks from the tasks array
                                        setTasks(
                                            tasks.filter(
                                                (task) =>
                                                    task.taskCompleted === true
                                            )
                                        );
                                    }
                                });
                            }}>
                            Pending (
                            {
                                tasks.filter(
                                    (task) => task.taskCompleted === false
                                ).length
                            }
                            )
                        </Dropdown.Item>
                    )}

                    {/* Button to delete all pending tasks */}
                    {tasks.filter((task) => task.taskCompleted === true)
                        .length > 0 && (
                        <Dropdown.Item
                            as="button"
                            className="btn btn-danger"
                            onClick={() => {
                                Swal.fire({
                                    // Sweet Alert to confirm the deletion
                                    title: "Are you sure you want to delete all completed tasks?",
                                    text: "You won't be able to revert this!",
                                    icon: "warning",
                                    showCancelButton: true,
                                    confirmButtonColor: "#3085d6",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        // if the user confirms the deletion
                                        localStorage.setItem(
                                            "tasks",
                                            JSON.stringify(
                                                tasks.filter(
                                                    (task) =>
                                                        task.taskCompleted ===
                                                        false
                                                )
                                            )
                                        );
                                        Swal.fire(
                                            "Deleted!",
                                            "Your completed tasks have been deleted.",
                                            "success"
                                        );
                                        // Remove all completed tasks from the tasks array
                                        setTasks(
                                            tasks.filter(
                                                (task) =>
                                                    task.taskCompleted === false
                                            )
                                        );
                                    }
                                });
                            }}>
                            Completed (
                            {
                                tasks.filter(
                                    (task) => task.taskCompleted === true
                                ).length
                            }
                            )
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default DeleteButtons;
