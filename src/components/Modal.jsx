import React from "react";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="btn btn-secondary mt-4" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default Modal;
