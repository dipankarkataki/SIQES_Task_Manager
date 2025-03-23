import React, { useState, useEffect } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import API from "../../../../services/Api";

const AllTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTaskDeleted, setIsTaskDeleted] = useState(false);
    const [deletingTask, setDeletingTask] = useState(null);
    const [filterStatus, setFilterStatus] = useState("")
    const navigate = useNavigate();

    const getTasks = async () => {
        try {
            setIsLoading(true);
            const res = await API.get("/task-management/task/all-tasks");
            console.log(res.data);
            if (res.data.success === true) {
                setTasks(res.data.data);
                setFilteredTasks(res.data.data);
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

    // Filter the tasks when filterStatus changes
    useEffect(() => {
        if (filterStatus === "" || filterStatus === "all") {
            setFilteredTasks(tasks);
        } else {
            setFilteredTasks(tasks.filter(task => task.status === filterStatus));
        }
    }, [filterStatus, tasks]);

    const handleFilterChange = (event) => {
        setFilterStatus(event.target.value);
    };

    const editTask = (task_id) => {
        navigate(`/edit-task/${task_id}`);

    }

    const deleteTask = async (task_id) => {
        setDeletingTask(task_id);
        try {
            const res = await API.delete(`/task-management/task/delete-task/${task_id}`);
            if (res.data.success === true) {
                alert('Task deleted successfully');
                setIsTaskDeleted(prev => !prev);
            } else {
                alert("Failed to delete task");
            }
        } catch (err) {
            console.log(err)
        } finally {
            setDeletingTask(null);
        }
    }

    return (
        <div className="all-task-wrapper">
            <div className="d-flex justify-content-between">
                <h3 className="mx-3 my-3">All Tasks</h3>
                <select name="filter-task" id="filter-task" className="form-select w-25 mx-3 my-3" value={filterStatus} onChange={handleFilterChange}>
                    <option value="">Filter Task By Status</option>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div className="all-task-table-wrapper">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Category</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Due Date</th>
                                <th>Priority</th>
                                {/* <th>Created By</th>
                                <th>Updated By</th>
                                <th>Deleted By</th> */}
                                <th>Is Deleted</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ?
                                (
                                    <tr>
                                        <td colSpan="11" className="text-center">Please wait. Loading data...</td>
                                    </tr>

                                ) :  filteredTasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="11" className="text-center">No tasks found.</td>
                                    </tr>
                                ) :
                                filteredTasks.map((task, index) => {
                                    const isDeleted = task.deleted_at;
                                    return (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td className="wrap_task_text">{task.category?.title || 'N/A'}</td>
                                            <td className="wrap_task_text">{task.title ? (task.title.length > 100 ? task.title.substring(0, 60) + "..." : task.title) : "N/A"}</td>
                                            <td className="wrap_task_text">{task.description ? (task.description.length > 100 ? task.description.substring(0, 60) + "..." : task.description) : "N/A"}</td>
                                            <td>
                                                {task.status == 'pending' && (<span className="badge bg-danger">Pending</span>)}
                                                {task.status == 'in_progress' && (<span className="badge bg-warning">In Progress</span>)}
                                                {task.status == 'completed' && (<span className="badge bg-success">Completed</span>)}
                                            </td>
                                            <td>{task.assigned_to?.name || "N/A"}</td>
                                            <td>{task.due_date}</td>
                                            <td>
                                                {task.priority == 'low' && (<span className="badge bg-info">Low</span>)}
                                                {task.priority == 'medium' && (<span className="badge bg-warning">Medium</span>)}
                                                {task.priority == 'high' && (<span className="badge bg-danger">High</span>)}
                                            </td>
                                            {/* <td>{task.created_by?.role || "N/A"}</td>
                                            <td>{task.updated_by?.role || "N/A"}</td>
                                            <td>{task.deleted_by?.role || "N/A"}</td> */}
                                            <td>{task.deleted_at ? <span className="badge bg-danger">Deleted</span> : <span className="badge bg-success">Active</span>}</td>
                                            <td>
                                                <button className="btn btn-sm btn-outline-primary mx-2" disabled={isDeleted} onClick={() => editTask(task.id)}>Edit</button>
                                                <button className="btn btn-sm btn-outline-danger mx-2" disabled={deletingTask === task.id || isDeleted} onClick={() => deleteTask(task.id)}> {deletingTask === task.id ? 'Please wait...' : 'Delete'}</button>
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