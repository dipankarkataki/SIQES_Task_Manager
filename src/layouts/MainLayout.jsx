import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import AppNavbar from "../components/Navbar/Navbar";
import "./styles.css";

const MainLayout = () => {  
  return (
    <div className="wrapper">
      <Sidebar />
      <div className="content-wrapper"> 
        <AppNavbar />
        <div className="main">
          <Outlet />
        </div>
      </div>
        {/* <div className="sidebar-wrapper">
            <Sidebar />
        </div>
        <div className="content-wrapper">
            <AppNavbar />
            <div className="main">
                <Outlet />
            </div>
        </div> */}
    </div>
  )
}

export default MainLayout;