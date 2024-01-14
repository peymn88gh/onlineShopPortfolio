import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children, style }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div onClick={onClose ?? null} className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50" role="dialog" aria-modal="true">
      <div onClick={(e)=>e.stopPropagation()}  style={style} className="rounded-lg shadow-lg" role="document">
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
