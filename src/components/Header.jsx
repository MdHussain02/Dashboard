import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { Home as HomeIcon, User2Icon } from "lucide-react";
const Header = () => {

  return (
    <Navbar bg="white" className="border-bottom header">
      <Container fluid>
        <Navbar.Brand className="d-flex align-items-center">
          <HomeIcon className="brand-icon" />
          <span className="ms-2 fw-semibold">Home</span>
        </Navbar.Brand>
        <Navbar.Brand className="d-flex align-items-center" onClick={()=> alert("u clicked user")}>
          <User2Icon className="brand-icon" />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
