import React, { useEffect, useState } from "react";
import "./styles.css";
import API from "../../../../services/Api";

const CreateTask = () => {
    const [allCategories, setAllCategories] = useState([]);
    const [category_id, setCategoryId] = useState("");
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [due_date, setDueDate] = useState("");
    const [status, setStatus] = useState("");
    const [assigned_to, setAssignTo] = useState("");
    const [remarks, setRemarks] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [isUserLoading, setIsUserLoading] = useState(false);


    const getUsers = async () => {
        setIsUserLoading(true);
        try {
            const res = await API.get("/user-management/users");
            console.log(res.data.data);
            if (res.data.success === true) {
                setUsers(res.data.data);
            } else {
                alert("Failed to load data");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsUserLoading(false);
        }
    }

    const getCategories = async () => {
        try {
            setIsCategoryLoading(true);
            const res = await API.get("/task-management/category/all-categories");
            console.log(res.data);
            if (res.data.success === true) {
                setAllCategories(res.data.data);
            } else {
                alert("Failed to load data");
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsCategoryLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
        getCategories();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await API.post("/task-management/task/create-task", {
                category_id, title, description, priority, due_date, status, assigned_to, remarks
            });
            console.log('Res : ', res.data)
            if (res.data.success === true) {
                alert("Task created successfully");
                setCategoryId("");
                setTitle("");
                setDescription("");
                setPriority("");
                setDueDate("");
                setAssignTo("");
                setRemarks("");
            } else {
                alert("Failed to create task");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="create-task-wrapper">
            <h3 className="mx-3 my-3">Create Task</h3>
            <div className="create-task-form-wrapper">
                <form className='create-task-form' onSubmit={handleCreateTask}>
                    <div className="form-group mb-2">
                        <label htmlFor='category' className='form-label'>Select Category</label>
                        <select className="form-select" value={category_id} onChange={(e) => setCategoryId(e.target.value)}>
                            {isCategoryLoading ? (
                                <option value="">Loading data...</option>
                            ) : (
                                <>
                                    <option value="">Select</option>
                                    {
                                        allCategories.some(category => !category.deleted_at) ? (
                                            allCategories.map(category =>
                                                !category.deleted_at && (
                                                    <option key={category.id} value={category.id}>{category.title}</option>
                                                )
                                            )
                                        ) : (
                                            <option value="">Oops! No Category Available</option>
                                        )
                                    }
                                </>
                            )}
                        </select>
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='title' className='form-label'>Title</label>
                        <input type='text' id='title' name="title" className='form-control' value={title} placeholder='e.g Example Task' onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
                        <span className="max-char-allowed">Maximum characters allowed 200.</span>
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='description' className='form-label'>Description</label>
                        <textarea id='description' name="description" className='form-control' value={description} placeholder='e.g Task description here..' onChange={(e) => setDescription(e.target.value)} rows="3" required maxLength={800}></textarea>
                        <span className="max-char-allowed">Maximum charcters allowed 800.</span>
                    </div>
                    <div className="d-flex flex-row flex-wrap justify-content-between align-items-center">
                        <div className="form-group mb-2">
                            <label htmlFor='priority' className='form-label'>Select Priority</label>
                            <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)} required>
                                <option value="">Select</option>
                                <option value="high" className="text-danger">High</option>
                                <option value="medium" className="text-warning">Medium</option>
                                <option value="low" className="text-secondary">Low</option>
                            </select>
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor='due_date' className='form-label'>Due Date</label>
                            <input type="date" name="due_date" className="form-control" value={due_date} onChange={(e) => setDueDate(e.target.value)} required />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor='role' className='form-label'>Select Status</label>
                            <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select</option>
                                <option value="pending" className="text-danger">Pending</option>
                                <option value="in_progress" className="text-warning">In Progress</option>
                                <option value="completed" className="text-success">Completed</option>
                            </select>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor='role' className='form-label'>Assign To</label>
                            <select className="form-select" value={assigned_to} onChange={(e) => setAssignTo(e.target.value)}>
                                {
                                    isUserLoading ? (
                                        <option value="">Loading data....</option>
                                    ) : (
                                        <>
                                            <option value="">Select</option>
                                            {
                                                users.map((user) => (
                                                    <option key={user.id} value={user.id}>{user.name}</option>
                                                ))
                                            }
                                        </>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                    <div className='form-group mb-2'>
                        <label htmlFor='remarks' className='form-label'>Remarks</label>
                        <textarea id='remarks' name="remarks" className='form-control' value={remarks} placeholder='e.g Task remarks here..' onChange={(e) => setRemarks(e.target.value)} rows="3" maxLength={800}></textarea>
                        <span className="max-char-allowed">Maximum charcters allowed 800.</span>
                    </div>

                    <div className='form-btn-wrapper d-grid'>
                        <button type='submit' className='btn btn-outline-dark btn-block' disabled={isLoading}> {isLoading ? 'Please wait...' : 'Create'} </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default CreateTask;