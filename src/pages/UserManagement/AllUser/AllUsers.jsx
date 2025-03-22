import React, { useState, useEffect } from "react";
import API from "../../../services/Api";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUserDeleted, setIsUserDeleted] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await API.get("/user-management/users");
      if (res.data.success === true) {
        setUsers(res.data.data);
        console.log(res.data.data);
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
    setIsDeleting(true);
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
      setIsDeleting(false);
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
                      <td colSpan="4" className="text-center">Please wait. Loading data...</td>
                    </tr>

                  ) :
                  users.map((user, index) => {
                    const isDeleted = user.deleted_at;
                    return (
                      <tr key={index}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.deleted_at ? <span className="badge bg-danger">Deleted</span> : <span className="badge bg-success">Active</span>}</td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary mx-2" disabled={isDeleted} onClick={() => editUser(user.id)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger mx-2" disabled={isDeleting || isDeleted} onClick={() => deleteUser(user.id)}> {isDeleting ? 'Please wait...' : 'Delete'}</button>
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