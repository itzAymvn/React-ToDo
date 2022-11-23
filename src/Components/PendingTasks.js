import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";
import Task from "./Task";
import Alert from "react-bootstrap/Alert";

import Swal from "sweetalert2";

const PendingTasks = () => {
    const { tasks, setTasks } = useContext(tasksContext);

    // sort tasks by taskTIme so that the latest tasks are on top
    let sortedTasks = tasks.sort((a, b) => {
        return new Date(b.taskTime) - new Date(a.taskTime);
    });

    // filter tasks to only show pending tasks
    let pendingTasks = sortedTasks.filter(
        (task) => task.taskCompleted === false
    );

    // change document title to show number of pending tasks
    document.title = `Pending Tasks (${pendingTasks.length})`;

    return (
        <div className="pending-tasks">
            <h1 className="text-center">
                <i className="bi bi-list-task mx-2"></i>Pending tasks
            </h1>
            {pendingTasks.length > 0 ? (
                pendingTasks.map((task, index) => {
                    return <Task key={index} task={task} index={index} />;
                })
            ) : (
                <Alert variant="warning">
                    <Alert.Heading>No pending tasks!</Alert.Heading>
                    You have no pending tasks. That's great! You can go outside
                    and play!
                </Alert>
            )}
            <button
                onClick={() => {
                    Swal.fire({
                        title: "Are you sure you want to delete all tasks?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete all!",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setTasks(() => {
                                return tasks.filter(
                                    (task) => task.taskCompleted === true
                                );
                            });
                            Swal.fire(
                                "Deleted!",
                                "All tasks have been deleted.",
                                "success"
                            );
                        }
                    });
                }}
                className="btn btn-danger mr-2 mt-2">
                Delete all
            </button>
        </div>
    );
};

export default PendingTasks;
