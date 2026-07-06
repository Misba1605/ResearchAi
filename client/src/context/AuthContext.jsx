import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react"
import apiClient from "../api/apiClient"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)

    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }, [])

  const login = useCallback((tokenValue, userData) => {
    setToken(tokenValue)
    setUser(userData)

    localStorage.setItem("token", tokenValue)
    localStorage.setItem("user", JSON.stringify(userData))
  }, [])

  useEffect(() => {
    const validateSession = async () => {
      const storedToken = localStorage.getItem("token")

      if (!storedToken) {
        setLoading(false)
        return
      }

      try {
        const response = await apiClient.get("/me")
        const currentUser = response.data.user

        setToken(storedToken)
        setUser(currentUser)

        localStorage.setItem("user", JSON.stringify(currentUser))
      } catch {
        logout()
      } finally {
        setLoading(false)
      }
    }

    validateSession()
  }, [logout])

  useEffect(() => {
    window.addEventListener("auth:logout", logout)

    return () => {
      window.removeEventListener("auth:logout", logout)
    }
  }, [logout])

  const isLoggedIn = Boolean(token && user)

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isLoggedIn,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}