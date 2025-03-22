import React, { useEffect, useState } from "react";
import API from "../../../services/Api";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css"


const EditUser = () => {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const getUser = async () => {
        setIsLoading(true)
        try {
            const res = await API.get(`user-management/user-by-id/${user_id}`);
            if (res.data.success === true) {
                setName(res.data.data.name);
                setEmail(res.data.data.name);
                setRole(res.data.data.role);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div className="create-user-wrapper">
            <h3 className="mx-3 my-3">Edit User</h3>
            <div className="form-wrapper">
                <form className='form'>
                    {
                        isLoading ?
                        (
                            <p>Please wait. Loading data....</p>
                        ) :

                        (
                            <>
                                <div className='form-group mb-3'>
                                    <label htmlFor='username' className='form-label'>Name</label>
                                    <input type='text' id='name' name="name" className='form-control' value={name} placeholder='jhon Doe' onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor='username' className='form-label'>Email</label>
                                    <input type='email' id='email' name="email" className='form-control' value={email} placeholder='jhondoe@xyz.com' onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className='form-group mb-3'>
                                    <label htmlFor='password' className='form-label'>Password</label>
                                    <input type='password' id='password' name="password" className='form-control' value={password} placeholder='*********' onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor='role' className='form-label'>Select Role</label>
                                    <select className="form-select" required value={role} onChange={(e) => setRole(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                    </select>
                                </div>
                                <div className='form-btn-wrapper d-grid'>
                                    <button type='submit' className='btn btn-outline-dark btn-block' disabled={isLoading}> {isLoading ? 'Please wait...' : 'Create'} </button>
                                </div>

                            </>

                        )
                    }
                </form>
            </div>
        </div>
    )
};

export default EditUser;