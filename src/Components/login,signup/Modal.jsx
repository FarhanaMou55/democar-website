import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md max-h-[90vh] relative overflow-y-auto shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-2xl text-gray-600 hover:text-red-600"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
