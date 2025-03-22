import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AllUsers from "./pages/UserManagement/AllUsers";
import AllTasks from "./pages/TaskManagement/AllTasks";
import Dashboard from "./pages/Dashboard/Dashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap all routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} /> 
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-tasks" element={<AllTasks />} />
        </Route>
      </Routes>
    </Router>
  )
};

export default App;