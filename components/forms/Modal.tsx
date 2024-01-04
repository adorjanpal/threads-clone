import React from "react";

interface Props {
  isOpen: any;
  onClose: any;
  children: any;
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 bg-dark-3 bg-opacity-70 w-full h-full  flex justify-center z-50 text-gray-1"
    >
      <div className="bg-dark-4 p-4 max-h-96 w-fit m-auto rounded-md shadow-md shadow-gray-900">
        {children}
      </div>
    </div>
  );
};

export default Modal;
