// src/components/TutorialPopup.tsx
import React from "react";
import { useAppDispatch } from "../redux/hook";
import { useNavigate } from "react-router-dom";
import { markTutorialAsSeen } from "../redux/slice/tutorial";
import Box from "./Box";

const TutorialPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleYes = () => {
    dispatch(markTutorialAsSeen());
    navigate("/tutorial");
  };

  const handleNo = () => {
    dispatch(markTutorialAsSeen());
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-6 rounded-xl shadow-xl w-[90%] max-w-sm">
        <Box className="text-text-dark">
          <h2 className="text-lg font-semibold mb-4">Tampilkan Tutorial?</h2>
          <p className="mb-6">
            Apakah kamu ingin melihat tutorial terlebih dahulu?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleNo}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition cursor-pointer"
            >
              Tidak
            </button>
            <button
              onClick={handleYes}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer"
            >
              Ya
            </button>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default TutorialPopup;
