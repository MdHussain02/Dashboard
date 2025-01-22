import React from 'react';
import { X } from 'lucide-react';
import '../styles/Modal.css';  // We'll create this CSS file next

const CustomModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-content">
          <h3 className="modal-title">Confirm Logout</h3>
          <p className="modal-message">
            Are you sure you want to logout? All unsaved changes will be lost.
          </p>
        </div>

        <div className="modal-actions">
          <button className="modal-button cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-button confirm" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;