import React, { createContext, useCallback, useContext, useMemo, useState } from "react"
import Snackbar from "../components/UI/molecules/Snackbar.tsx"
import type { SnackbarType } from "../types.ts"

interface SnackbarState {
  open: boolean;
  message: string;
  type: SnackbarType;
}

interface SnackbarContextValue {
  show: (message: string, type?: SnackbarType, durationMs?: number) => void;
}

const SnackbarContext = createContext<SnackbarContextValue | undefined>(undefined)

export const useSnackbar = (): SnackbarContextValue => {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error("useSnackbar must be used within SnackbarProvider")
  return ctx
}

export const SnackbarProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<SnackbarState>({ open: false, message: "", type: "success" })
  const [timer, setTimer] = useState<number | null>(null)

  const show = useCallback((message: string, type: SnackbarType = "success", durationMs = 2500) => {
    if (timer) window.clearTimeout(timer)
    setState({ open: true, message, type })
    const id = window.setTimeout(() => {
      setState(prev => ({ ...prev, open: false }))
    }, durationMs)
    setTimer(id)
  }, [timer])

  const value = useMemo<SnackbarContextValue>(() => ({ show }), [show])

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar open={state.open} message={state.message} type={state.type} />
    </SnackbarContext.Provider>
  )
}


