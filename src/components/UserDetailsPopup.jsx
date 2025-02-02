import React, { useEffect } from "react";
import { User as UserIcon } from "lucide-react"; // Importing icons

const UserDetailsPopup = ({ show, onClose, username }) => {
  const popupRef = React.useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {show && (
        <div
          ref={popupRef}
          style={{
            position: "absolute",
            top: "50px", // Position the popup below the navbar
            right: "10px", // Adjust right positioning as needed
            backgroundColor: "#fff",
            padding: "15px",
            border: "1px solid #ddd",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            width: "350px", // Adjust width as needed
            zIndex: 9999, // Ensure it's on top of all other content
            height: "auto", // Adjust the height
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <h5 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <UserIcon size={20} style={{ marginRight: "8px" }} />
              <span className="text text-primary">{username}</span>
            </h5>
          </div>
          <div >
            <h6  style={{ fontSize: '0.85rem' }}>
              Email : 
              <span> {username}@gmail.com</span>
            </h6>
          </div>

        </div>
      )}
    </>
  );
};

export default UserDetailsPopup;
