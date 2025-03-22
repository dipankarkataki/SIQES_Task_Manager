import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
import AllUsers from "./pages/UserManagement/AllUser/AllUsers";
import AllTasks from "./pages/TaskManagement/Task/AllTasks/AllTasks";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreateUser from "./pages/UserManagement/Create/CreateUser";
import EditUser from "./pages/UserManagement/Edit/EditUser";
import AllCategories from "./pages/TaskManagement/Category/AllCategories/AllCategories";
import CreateCategory from "./pages/TaskManagement/Category/Create/CreateCategory";
import EditCategory from "./pages/TaskManagement/Category/Edit/EditCategory";
import CreateTask from "./pages/TaskManagement/Task/Create/CreateTask";
import EditTask from "./pages/TaskManagement/Task/Edit/EditTask";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="all-users" element={<AllUsers />} />
            <Route path="create-user" element={<CreateUser/>} />
            <Route path="edit-user/:user_id" element={<EditUser/>} />
            <Route path="all-categories" element={<AllCategories />} />
            <Route path="create-category" element={<CreateCategory />} />
            <Route path="edit-category/:category_id" element={<EditCategory />} />
            <Route path="all-tasks" element={<AllTasks />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="edit-task/:task_id" element={<EditTask />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
};

export default App;