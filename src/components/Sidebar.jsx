import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import CustomModal from "./CustomModal";

const Sidebar = ({ pages, handleNavigation, isActivePage }) => {
  const { isLoggedIn, logOut } = useAuth(); // Using the custom hook
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    logOut();
    navigate("/");
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="sidebar">
      <Nav className="flex-column m-2">
        {pages.map((page) => {
          const Icon = page.icon;
          const isActive = isActivePage(page.route);
          return (
            <div key={page.id}>
              <Nav.Link
                className={`sidebar-link mt-2 ${isActive ? "active" : ""}`}
                onClick={() => handleNavigation(page.route)}
              >
                <Icon className="nav-icon" />
                <span className="nav-label ms-1">{page.name}</span>
              </Nav.Link>
            </div>
          );
        })}
        {isLoggedIn && (
          <Nav.Link onClick={handleShowModal} className="sidebar-link-out mt-2">
            <LogOut className="nav-icon" />
            <span className="nav-label ms-1">Logout</span>
          </Nav.Link>
        )}
      </Nav>
      <CustomModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
