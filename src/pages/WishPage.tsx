import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"

import { useWishes } from "../context/WishesContext.tsx"

import Modal from "../components/UI/molecules/Modal.tsx"
import ConfirmModal from "../components/UI/molecules/ConfirmModal.tsx"
import Button from "../components/UI/atoms/Button.tsx"

const WishPage: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { selectedWish, getWishById, updateWish, deleteWish } = useWishes()

  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    const loadWish = async () => {
      if (id) {
        setLoading(true)
        const wish = await getWishById(id)
        if (!wish && isMounted) {
          navigate("/")
        }
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    loadWish()
    return () => {
      isMounted = false
    }
  }, [id, getWishById, navigate])

  const handleEditWish = async (payload: { image: string; title: string; description: string; price: number }) => {
    if (selectedWish) {
      await updateWish({ ...payload, id: selectedWish.id })
      setShowEditModal(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (selectedWish) {
      const idToDelete = selectedWish.id
      await deleteWish(idToDelete)
      setTimeout(() => {
        navigate("/")
      }, 100)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!selectedWish) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-4 sm:mb-6 text-violet-800 hover:text-violet-900 font-medium flex items-center gap-2 text-sm sm:text-base cursor-pointer transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
          </svg>
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="relative aspect-video bg-gray-100 flex items-center justify-center p-4">
            <img
              src={selectedWish.image}
              alt={selectedWish.title}
              className="w-full h-full object-contain max-h-full"
            />
          </div>
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-gray-900">{selectedWish.title}</h1>
            <p className="text-xl sm:text-2xl font-bold mb-4 text-violet-700">${selectedWish.price}</p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">{selectedWish.description}</p>
            <p className="mt-4 text-xs sm:text-sm text-gray-500">
              Added: {new Date(selectedWish.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
          <Button
            onClick={() => setShowEditModal(true)}
            text="Edit"
            variant="edit"
          />
          <Button
            onClick={() => setShowDeleteModal(true)}
            text="Delete"
            variant="delete"
          />
        </div>
      </div>

      {showEditModal && (
        <Modal
          mode="edit"
          initial={selectedWish}
          onSubmit={handleEditWish}
          onCancel={() => setShowEditModal(false)}
        />
      )}

      <ConfirmModal
        open={showDeleteModal}
        title={selectedWish.title}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setShowDeleteModal(false)}
      />
    </div>
  )
}

export default WishPage

