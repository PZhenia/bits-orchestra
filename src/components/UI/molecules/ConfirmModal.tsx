import React from "react"

interface ConfirmModalProps {
  open: boolean;
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, title, onConfirm, onCancel }) => {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-4 sm:p-6 shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold mb-2">Confirm Deletion</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Are you sure you want to delete "{title}"? <br />This action cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 justify-end">
          <button 
            onClick={onCancel} 
            className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm sm:text-base cursor-pointer"
          >
            No
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 rounded-lg bg-pink-800 text-white hover:bg-pink-900 text-sm sm:text-base cursor-pointer"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal

