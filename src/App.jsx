import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import MainLayout from "./layouts/MainLayout";
import PrivateRoutes from "./routes/PrivateRoutes";
import AllUsers from "./pages/UserManagement/AllUsers";
import AllTasks from "./pages/TaskManagement/AllTasks";
import Dashboard from "./pages/Dashboard/Dashboard";


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
            <Route path="all-tasks" element={<AllTasks />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
};

export default App;