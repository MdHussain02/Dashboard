import React from "react";
// import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../styles/ContentArea.css";  // Import the custom CSS for the scrollbar

const ContentArea = ({ isAnyPageActive }) => {
  return (
    <div className="content-area">
      <div className="">
        <div style={{border: "0px"}}>
          {isAnyPageActive ? (
            <Outlet />
          ) : (
            <h4 className="text-center text-muted m-4">
              Select any field from the sidebar
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentArea;