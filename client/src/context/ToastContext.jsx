import {
  createContext,
  useCallback,
  useContext,
  useState
} from "react"

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    )
  }, [])

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now()

    setToasts((currentToasts) => [
      ...currentToasts,
      { id, message, type }
    ])

    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.filter((toast) => toast.id !== id)
      )
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider
      value={{
        addToast,
        removeToast,
        toasts
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error(
      "useToast must be used within ToastProvider"
    )
  }

  return context
}