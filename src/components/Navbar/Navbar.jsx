import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./styles.css";

const AppNavbar = () => {
  return (
    <Navbar expand="lg" className="navbar p-2">
      <Container>
        <Navbar.Brand href="#">Dashboard</Navbar.Brand>
        <Nav className="ms-auto">
          {/* Profile Dropdown */}
          <NavDropdown title={
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=random"
                alt="Profile"
                className="profile-image"
              />
            }
            id="profile-dropdown"
            align="end"
            className="custom-dropdown"
          >
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
