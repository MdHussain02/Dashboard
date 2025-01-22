import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoggedInState } from "../atoms/authAtom";
import CustomModal from "./CustomModal";

const Sidebar = ({ pages, handleNavigation, isActivePage }) => {
  const navigate = useNavigate();
  const [logged, setLogged] = useRecoilState(isLoggedInState);
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setLogged(false);
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
        {logged&&(
        <Nav.Link onClick={handleShowModal} className="sidebar-link-out mt-2">
          <LogOut className="nav-icon" />
          <span className="nav-label ms-1">Logout</span>
        </Nav.Link>
        )
        }
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