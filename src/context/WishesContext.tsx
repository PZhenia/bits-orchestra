import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import type { Wish, SortState } from "../types.ts"
import { useWishesApi } from "../hooks/useWishesApi.ts"

interface WishesContextValue {
  wishes: Wish[]
  selectedWish: Wish | null
  sortState: SortState
  loading: boolean
  loadWishes: () => Promise<void>
  addWish: (wish: Omit<Wish, "id" | "createdAt">) => Promise<void>
  updateWish: (update: { id: Wish["id"] } & Partial<Omit<Wish, "id" | "createdAt">>) => Promise<void>
  deleteWish: (id: Wish["id"]) => Promise<void>
  getWishById: (id: Wish["id"]) => Promise<Wish | null>
  setSelectedWish: (wish: Wish | null) => void
  setSortState: (sort: Partial<SortState>) => void
  sortedWishes: Wish[]
}

const WishesContext = createContext<WishesContextValue | undefined>(undefined)

export const useWishes = (): WishesContextValue => {
  const ctx = useContext(WishesContext)
  if (!ctx) throw new Error("useWishes must be used within WishesProvider")
  return ctx
}

export const WishesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null)
  const [loading, setLoading] = useState(false)
  const [sortState, setSortStateInternal] = useState<SortState>({
    date: "new_first",
    price: "high_to_low",
  })
  const [activeSortType, setActiveSortType] = useState<"date" | "price">("date")

  const { fetchWishes, createWish, updateWishById, removeWish, fetchWishById } = useWishesApi()

  const fetchWishesRef = useRef(fetchWishes)
  useEffect(() => {
    fetchWishesRef.current = fetchWishes
  }, [fetchWishes])

  const loadWishes = useCallback(async () => {
    setLoading(true)
    const result = await fetchWishesRef.current()
    if (result) {
      setWishes(result)
    }
    setLoading(false)
  }, [])
  
  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      const result = await fetchWishesRef.current()
      if (mounted && result) {
        setWishes(result)
      }
      if (mounted) {
        setLoading(false)
      }
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const addWish = useCallback(async (wish: Omit<Wish, "id" | "createdAt">) => {
    const result = await createWish(wish)
    if (result) {
      setWishes(prev => [...prev, result])
    }
  }, [createWish])

  const updateWish = useCallback(async (update: { id: Wish["id"] } & Partial<Omit<Wish, "id" | "createdAt">>) => {
    const result = await updateWishById(update)
    if (result) {
      setWishes(prev => prev.map(w => w.id === update.id ? result : w))
      if (selectedWish?.id === update.id) {
        setSelectedWish(result)
      }
    }
  }, [updateWishById, selectedWish])

  const deleteWish = useCallback(async (id: Wish["id"]) => {
    const success = await removeWish(id)
    if (success) {
      setWishes(prev => prev.filter(w => w.id !== id))
      if (selectedWish?.id === id) {
        setSelectedWish(null)
      }
    }
  }, [removeWish, selectedWish])

  const getWishById = useCallback(async (id: Wish["id"]): Promise<Wish | null> => {
    const result = await fetchWishById(id)
    if (result) {
      setSelectedWish(result)
    }
    return result
  }, [fetchWishById])

  const setSortState = useCallback((sort: Partial<SortState>) => {
    setSortStateInternal(prev => ({ ...prev, ...sort }))
    if (sort.price !== undefined) {
      setActiveSortType("price")
    } else if (sort.date !== undefined) {
      setActiveSortType("date")
    }
  }, [])

  const sortedWishes = useMemo(() => {
    const sorted = [...wishes]

    if (activeSortType === "price") {
      if (sortState.price === "high_to_low") {
        sorted.sort((a, b) => b.price - a.price)
      } else {
        sorted.sort((a, b) => a.price - b.price)
      }
    } else {
      if (sortState.date === "new_first") {
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      } else {
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      }
    }

    return sorted
  }, [wishes, sortState, activeSortType])


  const value = useMemo<WishesContextValue>(() => ({
    wishes,
    selectedWish,
    sortState,
    loading,
    loadWishes,
    addWish,
    updateWish,
    deleteWish,
    getWishById,
    setSelectedWish,
    setSortState,
    sortedWishes,
  }), [wishes, selectedWish, sortState, loading, loadWishes, addWish, updateWish, deleteWish, getWishById, setSortState, sortedWishes])

  return (
    <WishesContext.Provider value={value}>
      {children}
    </WishesContext.Provider>
  )
}

