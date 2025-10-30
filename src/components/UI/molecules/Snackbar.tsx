import React from "react"
import type { SnackbarType } from "../../../types.ts"

interface SnackbarProps {
  open: boolean;
  message: string;
  type?: SnackbarType;
}

const colors: Record<SnackbarType, string> = {
  success: "bg-emerald-600",
  error: "bg-rose-600",
}

const Snackbar: React.FC<SnackbarProps> = ({ open, message, type = "success" }) => {
  return (
    <div
      className={`fixed bottom-5 right-5 transition-all duration-300 z-50 ${
        open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <div className={`text-white px-4 py-3 rounded-lg shadow-lg ${colors[type]}`}>
        {message}
      </div>
    </div>
  )
}

export default Snackbar


