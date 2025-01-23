import React from "react";
import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "../styles/ContentArea.css";  // Import the custom CSS for the scrollbar

const ContentArea = ({ isAnyPageActive }) => {
  return (
    <div className="content-area">
      <Card className="">
        <Card.Body>
          {isAnyPageActive ? (
            <Outlet />
          ) : (
            <h4 className="text-center text-muted m-4">
              Select any field from the sidebar
            </h4>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContentArea;