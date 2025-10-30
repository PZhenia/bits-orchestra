import React, { useState, useMemo } from "react"
import { useNavigate } from "react-router"

import { useWishes } from "../context/WishesContext.tsx"

import Card from "../components/UI/molecules/Card.tsx"
import Modal from "../components/UI/molecules/Modal.tsx"
import ConfirmModal from "../components/UI/molecules/ConfirmModal.tsx"
import Select from "../components/UI/atoms/Select.tsx"
import Button from "../components/UI/atoms/Button.tsx"

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const {
    sortedWishes,
    loading,
    addWish,
    updateWish,
    deleteWish,
    setSortState,
    sortState,
  } = useWishes()

  const [showAddModal, setShowAddModal] = useState(false)
  const [editWish, setEditWish] = useState<{ id: string | number; image: string; title: string; description: string; price: number } | null>(null)
  const [deleteWishId, setDeleteWishId] = useState<string | number | null>(null)
  const [deleteWishTitle, setDeleteWishTitle] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const totalPages = Math.ceil(sortedWishes.length / itemsPerPage)

  const paginatedWishes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedWishes.slice(start, end)
  }, [sortedWishes, currentPage])

  const handleAddWish = async (payload: { image: string; title: string; description: string; price: number }) => {
    await addWish(payload)
    setShowAddModal(false)
  }

  const handleEditWish = async (payload: { image: string; title: string; description: string; price: number }) => {
    if (editWish) {
      await updateWish({ ...payload, id: editWish.id })
      setEditWish(null)
    }
  }

  const handleDeleteClick = (id: string | number, title: string) => {
    setDeleteWishId(id)
    setDeleteWishTitle(title)
  }

  const handleDeleteConfirm = async () => {
    if (deleteWishId !== null) {
      await deleteWish(deleteWishId)
      setDeleteWishId(null)
      setDeleteWishTitle("")
    }
  }

  const handleDeleteCancel = () => {
    setDeleteWishId(null)
    setDeleteWishTitle("")
  }

  const dateOptions = [
    { value: "new_first", label: "Newest first" },
    { value: "old_first", label: "Oldest first" },
  ]

  const priceOptions = [
    { value: "high_to_low", label: "High to low" },
    { value: "low_to_high", label: "Low to high" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
          My Wishes
        </h1>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between bg-white p-4 rounded-lg shadow">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-1 w-full sm:w-auto">
            <Select
              options={dateOptions}
              value={sortState.date}
              onChange={(value) => setSortState({ date: value as "new_first" | "old_first" })}
              placeholder=""
              label="Sort by date"
              className="w-full sm:min-w-[180px] sm:w-auto"
            />
            <Select
              options={priceOptions}
              value={sortState.price}
              onChange={(value) => setSortState({ price: value as "high_to_low" | "low_to_high" })}
              placeholder=""
              label="Sort by price"
              className="w-full sm:min-w-[180px] sm:w-auto"
            />
          </div>
          <Button
            onClick={() => setShowAddModal(true)}
            text="Add new wish"
            variant="add"
            icon={<span className="text-lg">+</span>}
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : paginatedWishes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-dashed">
            <p className="text-gray-600 font-medium mb-1">No wishes yet</p>
            <p className="text-gray-500 text-sm">Add your first wish to get started!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {paginatedWishes.map((wish) => (
                <Card
                  key={wish.id}
                  image={wish.image}
                  title={wish.title}
                  description={wish.description}
                  price={wish.price}
                  onDelete={() => handleDeleteClick(wish.id, wish.title)}
                  onEdit={() => setEditWish(wish)}
                  onDetails={() => navigate(`/wish/${wish.id}`)}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-default hover:bg-gray-50 cursor-pointer"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-default hover:bg-gray-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {showAddModal && (
        <Modal
          mode="add"
          onSubmit={handleAddWish}
          onCancel={() => setShowAddModal(false)}
        />
      )}

      {editWish && (
        <Modal
          mode="edit"
          initial={editWish}
          onSubmit={handleEditWish}
          onCancel={() => setEditWish(null)}
        />
      )}

      <ConfirmModal
        open={deleteWishId !== null}
        title={deleteWishTitle}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}

export default Dashboard

