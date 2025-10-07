import * as React from "react"
import { Toast, ToastProps } from "@/components/ui/toast"

type ToastType = ToastProps & {
  id: string
}

const ToastContext = React.createContext<{
  toasts: ToastType[]
  addToast: (toast: ToastType) => void
  removeToast: (id: string) => void
} | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastType[]>([])

  const addToast = (toast: ToastType) => setToasts([...toasts, toast])
  const removeToast = (id: string) =>
    setToasts(toasts.filter((t) => t.id !== id))

  return React.createElement(
    ToastContext.Provider,
    { value: { toasts, addToast, removeToast } },
    children
  )
}
