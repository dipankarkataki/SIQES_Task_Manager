import React from "react";
import { Accordion, Nav } from "react-bootstrap";
import "./styles.css";
import brandLogo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar text-white vh-100">
      <div className="brand-wrapper">
        <img src={brandLogo} alt="brand-logo" className="brand-logo"/>
      </div>

      <Accordion flush className="mx-2 mt-3">
        {/* User Management Section */}
        <Nav className="nav-wrapper">
          <Nav.Link as={Link} to="/" className="text-dark">Dashboard</Nav.Link>
        </Nav>
        <Accordion.Item eventKey="0">
          <Accordion.Header className="text-white">User Management</Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/all-users" className="text-dark">All Users</Nav.Link>
              <Nav.Link as={Link} to="/create-user" className="text-dark">Create User</Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        {/* Task Management Section */}
        <Accordion.Item eventKey="1">
          <Accordion.Header className="text-white">Task Management</Accordion.Header>
          <Accordion.Body>
            {/* Category Subsection */}
            <Accordion flush>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Category</Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    <Nav.Link as={Link} to="/all-categories" className="text-dark">All Categories</Nav.Link>
                    <Nav.Link href="#" className="text-dark">Create Category</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>

              {/* Task Subsection */}
              <Accordion.Item eventKey="3">
                <Accordion.Header>Task</Accordion.Header>
                <Accordion.Body>
                  <Nav className="flex-column">
                    <Nav.Link as={Link} to="/all-tasks" className="text-dark">All Tasks</Nav.Link>
                    <Nav.Link href="#" className="text-dark">Create Task</Nav.Link>
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default Sidebar;