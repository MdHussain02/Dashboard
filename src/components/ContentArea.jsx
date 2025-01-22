import React from "react";
import { Card } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const ContentArea = ({ isAnyPageActive }) => {
  return (
    <div className="content-area">
      <Card className="h-100">
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
