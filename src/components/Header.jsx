// Header.js
import React, { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { Home as HomeIcon, User2Icon } from "lucide-react";
import useUser from "../hooks/useUser"; // Import the custom hook
import UserDetailsPopup from "./UserDetailsPopup"; // Import the new popup component

const Header = () => {
  const { username } = useUser(); 
  const [showPopup, setShowPopup] = useState(false); 

  const handleShowPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <Navbar bg="white" className="border-bottom header" style={{ position: "relative" }}>
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <HomeIcon className="brand-icon" />
            <span className="ms-2 fw-semibold">Home</span>
          </Navbar.Brand>
          <Navbar.Brand className="d-flex align-items-center" onClick={handleShowPopup}>
            <User2Icon className="brand-icon" />
            <span className="ms-2 text text-primary" style={{ fontSize: '0.85rem' }}>{username}</span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Use the UserDetailsPopup component */}
      <UserDetailsPopup 
        show={showPopup} 
        onClose={handleClosePopup} 
        username={username} 
      />
    </>
  );
};

export default Header;
