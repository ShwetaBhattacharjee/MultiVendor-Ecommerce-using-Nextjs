import { FC } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  sellerInfo: string; // Replace with actual seller data if needed
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, sellerInfo }) => {
  if (!isOpen) return null; // Do not render the modal if it’s not open

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-md p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <h2 className="text-xl font-bold">Seller Info</h2>
        <p>{sellerInfo}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
