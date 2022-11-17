import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";
import Task from "./Task";
import Alert from "react-bootstrap/Alert";

const CompletedTasks = () => {
    const { tasks, setTasks } = useContext(tasksContext);
    let pendingTasks = tasks.filter((task) => task.taskCompleted === true);
    document.title = `Completed Tasks (${pendingTasks.length})`;

    return (
        <div className="tasks">
            <h1 className="text-center">
                <i className="bi bi-list-task mx-2"></i>Comleted tasks
            </h1>
            {pendingTasks.length > 0 ? (
                pendingTasks.map((task, index) => {
                    return <Task key={index} task={task} index={index} />;
                })
            ) : (
                <Alert variant="warning">
                    <Alert.Heading>No completed tasks!</Alert.Heading>
                    <p>
                        You have no completed tasks. Unfortunately, you have to
                        work!
                    </p>
                </Alert>
            )}
            <button
                onClick={() => {
                    setTasks(() => {
                        return tasks.filter(
                            (task) => task.taskCompleted === false
                        );
                    });
                    window.location.reload();
                }}
                className="btn btn-danger mr-2 mt-2">
                Delete all
            </button>
        </div>
    );
};

export default CompletedTasks;
