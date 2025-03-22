import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import API from "../../services/Api";

const AppNavbar = () => {
  const navigate = useNavigate();
  const logout = async () => {
    try{
      const res = await API.post("/user-management/logout");
      if(res.data.success === true){
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.log(res);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <Navbar expand="lg" className="navbar-wrapper p-2">
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
            <NavDropdown.Item>
              <button className="btn btn-sm btn-secondary" onClick={logout}>Logout</button>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
