import React, { useContext } from "react";
import tasksContext from "../Context/Tasks";
import Task from "./Task";

// REACT BOOTSTRAP
import Alert from "react-bootstrap/Alert";

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

                    <h1 className="text-center">Your tasks</h1>

                    {tasks.length > 0 &&
                        tasks.map((task, index) => {
                            return (
                                <Task key={index} task={task} index={index} />
                            );
                        })}

                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.clear();
                            window.location.reload();
                        }}>
                        Clear All Tasks
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
