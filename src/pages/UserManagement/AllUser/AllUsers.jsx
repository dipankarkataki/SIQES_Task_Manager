import React, { useState, useEffect } from "react";
import API from "../../../services/Api";
import "./styles.css";
import { Link } from "react-router-dom";

const AllUsers = () => {

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
  }, []);

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
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <Link to={`/edit-user/${user.id}`} className="btn btn-sm btn-outline-primary">Edit</Link>
                        <button className="btn btn-sm btn-outline-danger mx-2">Delete</button>
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllUsers;