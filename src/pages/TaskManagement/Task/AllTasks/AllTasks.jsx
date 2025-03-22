import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import API from "../../../../services/Api";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTaskDeleted, setIsTaskDeleted] = useState(false);
    const [deletingTask, setDeletingTask] = useState(null);
    const navigate = useNavigate();

    const getTasks = async () => {
        try {
            setIsLoading(true);
            const res = await API.get("/task-management/task/all-tasks");
            console.log(res.data);
            if (res.data.success === true) {
                setTasks(res.data.data);
            } else {
                alert("Failed to load data");
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        getTasks();
    }, [isTaskDeleted]);

    const editTask = (task_id) => {
        navigate(`/edit-task/${task_id}`);

    }

    const deleteTask = async (task_id) => {
        setDeletingTask(task_id);
        try{
            const res = await API.delete(`/task-management/task/delete-task/${task_id}`);
            if (res.data.success === true) {
              alert('Task deleted successfully');
              setIsTaskDeleted(prev => !prev);
            } else {
              alert("Failed to delete task");
            }
        }catch(err){
            console.log(err)
        }finally{
            setDeletingTask(null);
        }
    }

    return (
        <div className="all-task-wrapper">
            <h2 className="mx-3 my-3">All Tasks</h2>
            <div className="all-task-table-wrapper">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Created By</th>
                                <th>Updated By</th>
                                <th>Deleted By</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                    (
                                        <tr>
                                            <td colSpan="8" className="text-center">Please wait. Loading data...</td>
                                        </tr>

                                    ) :
                                    tasks.map((task, index) => {
                                        const isDeleted = task.deleted_at;
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td className="wrap_text">{task.title}</td>
                                                <td className="wrap_text">{task.description ?? 'N/A'}</td>
                                                <td>{task.created_by?.name || "N/A"}</td>
                                                <td>{task.updated_by?.name || "N/A"}</td>
                                                <td>{task.deleted_by?.name || "N/A"}</td>
                                                <td>{task.deleted_at ? <span className="badge bg-danger">Deleted</span> : <span className="badge bg-success">Active</span>}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-outline-primary mx-2" disabled={isDeleted} onClick={() => editCategory(task.id)}>Edit</button>
                                                    <button className="btn btn-sm btn-outline-danger mx-2" disabled={deletingTask === task.id || isDeleted} onClick={() => deleteCategory(task.id)}> {deletingTask === task.id ? 'Please wait...' : 'Delete'}</button>
                                                </td>
                                            </tr>
                                        )

                                    })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AllTasks;