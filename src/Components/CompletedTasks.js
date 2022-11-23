// React & Hooks
import React, { useContext } from "react";

// Context
import tasksContext from "../Context/Tasks";

// Components
import Task from "./Task";

// React Bootstrap
import Alert from "react-bootstrap/Alert";

// Swal
import Swal from "sweetalert2";

const CompletedTasks = () => {
    const { tasks, setTasks } = useContext(tasksContext);

    // Sorting the tasks by creation date
    let sortedTasks = tasks.sort((a, b) => {
        return new Date(b.taskTime) - new Date(a.taskTime);
    });

    // Filtering the tasks to show only the completed ones
    let completedTasks = sortedTasks.filter(
        (task) => task.taskCompleted === true
    );

    // Changing the document title to show the number of completed tasks
    document.title = `Completed Tasks (${completedTasks.length})`;

    return (
        <div className="completed-tasks">
            <h1 className="text-center">
                <i className="bi bi-list-task mx-2"></i>Comleted tasks
            </h1>
            {completedTasks.length > 0 ? (
                completedTasks.map((task, index) => {
                    return <Task key={index} task={task} index={index} />;
                })
            ) : (
                <Alert variant="warning">
                    <Alert.Heading>No completed tasks!</Alert.Heading>
                    You have no completed tasks. Unfortunately, you have to
                    work!
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
                                    (task) => task.taskCompleted === false
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

export default CompletedTasks;
