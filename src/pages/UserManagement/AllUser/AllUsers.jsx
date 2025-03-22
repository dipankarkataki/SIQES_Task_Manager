import React, { useState, useEffect } from "react";
import API from "../../../services/Api";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const navigate = useNavigate();

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/user-management/users");
      console.log(res.data.data);
      if (res.data.success === true) {
        setUsers(res.data.data);
      }else{
        alert("Failed to load data");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers()
  }, [isUserDeleted]);

  const deleteUser = async (user_id) => {
    setDeletingUser(user_id);
    try {
      const res = await API.delete(`/user-management/delete-user/${user_id}`);
      if (res.data.success === true) {
        alert('User deleted successfully');
        setIsUserDeleted(prev => !prev);
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.log(err)
    } finally {
      setDeletingUser(null);
    }
  }

  const editUser = (user_id) => {
    navigate(`/edit-user/${user_id}`)
  }

  return (
    <div className="all-users-wrapper">
      <h2 className="mx-3 my-3">All Users</h2>
      <div className="users-table-wrapper">
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                isLoading ?
                  (
                    <tr>
                      <td colSpan="6" className="text-center">Please wait. Loading data...</td>
                    </tr>

                  ) :
                  users.map((user, index) => {
                    const isDeleted = user.deleted_at;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.deleted_at ? <span className="badge bg-danger">Deleted</span> : <span className="badge bg-success">Active</span>}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary mx-2" disabled={isDeleted} onClick={() => editUser(user.id)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger mx-2" disabled={deletingUser === user.id || isDeleted} onClick={() => deleteUser(user.id)}> {deletingUser === user.id ? 'Please wait...' : 'Delete'}</button>
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

export default AllUsers;