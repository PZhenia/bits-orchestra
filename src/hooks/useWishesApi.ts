import { useCallback } from "react"

import { useSnackbar } from "../context/SnackbarContext.tsx"

import { getWishes, addWish, updateWish, deleteWish, getWish } from "../api/wishes.ts"

import type { Wish, CreateWish, UpdateWish } from "../types.ts"

export const useWishesApi = () => {
  const { show } = useSnackbar()

  const fetchWishes = useCallback(async (): Promise<Wish[] | null> => {
    try {
      const wishes = await getWishes()
      return wishes
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (!errorMessage.includes("Failed to fetch")) {
        show("Failed to load wishes", "error")
      }
      console.error("Failed to fetch wishes:", error)
      return null
    }
  }, [show])

  const createWish = useCallback(async (wish: CreateWish): Promise<Wish | null> => {
    try {
      const newWish = await addWish(wish)
      show("Wish successfully added", "success")
      return newWish
    } catch (error) {
      show("Failed to add wish", "error")
      console.error("Failed to create wish:", error)
      return null
    }
  }, [show])

  const updateWishById = useCallback(async (update: UpdateWish): Promise<Wish | null> => {
    try {
      const updatedWish = await updateWish(update)
      show("Wish successfully updated", "success")
      return updatedWish
    } catch (error) {
      show("Failed to update wish", "error")
      console.error("Failed to update wish:", error)
      return null
    }
  }, [show])

  const removeWish = useCallback(async (id: string | number): Promise<boolean> => {
    try {
      await deleteWish(id)
      show("Wish successfully deleted", "success")
      return true
    } catch (error) {
      show("Failed to delete wish", "error")
      console.error("Failed to delete wish:", error)
      return false
    }
  }, [show])

  const fetchWishById = useCallback(async (id: string | number): Promise<Wish | null> => {
    try {
      const wish = await getWish(id)
      return wish
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error)
      if (!errorMessage.includes("404") && !errorMessage.includes("Response returned 404")) {
        show("Failed to load wish", "error")
      }
      console.error("Failed to fetch wish:", error)
      return null
    }
  }, [show])

  return {
    fetchWishes,
    createWish,
    updateWishById,
    removeWish,
    fetchWishById,
  }
}

