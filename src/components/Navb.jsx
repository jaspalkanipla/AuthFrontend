import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/userContext";
import Axios from "axios";
Axios.defaults.withCredentials = true;
export default function Navb() {
  const { userData, setuserData, isAuth, setisAuth } = useContext(userContext);

  return (
    <div>
      <Navbar
        expand="lg"
        className="bg-body-tertiary "
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand href="#home">
            Auth<span>Project</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link
                as={Link}
                to="/signup"
                style={{ display: isAuth ? "none" : "block" }}
              >
                Sign<span>Up</span>
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/signin"
                style={{ display: isAuth ? "none" : "block" }}
              >
                Sign<span>In</span>
              </Nav.Link>
              <NavDropdown
                // title={<span>Dropdown <FaChevronDown /></span>}
                title={userData.userName}
                id="basic-nav-dropdown"
                style={{ display: isAuth ? "block" : "none" }}
              >
                <NavDropdown.Item align="start" as={Link} to="/signout">
                  Sign<span>Out</span>
                </NavDropdown.Item>
                <NavDropdown.Item align="start" as={Link} to="/dashboard">
                  Pro<span>file</span>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
