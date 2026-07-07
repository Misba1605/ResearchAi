import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./context/ToastContext"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Templates from "./pages/Templates"
import Editor from "./pages/Editor"
import MyDrafts from "./pages/MyDrafts"
import ProtectedRoute from "./components/ProtectedRoute"
import Toast from "./components/Toast"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="templates" element={
              <ProtectedRoute><Templates /></ProtectedRoute>
            } />
            <Route path="my-drafts" element={
              <ProtectedRoute><MyDrafts /></ProtectedRoute>
            } />
            <Route path="editor/scratch" element={
              <ProtectedRoute><Editor /></ProtectedRoute>
            } />
            <Route path="editor/:templateName" element={
              <ProtectedRoute><Editor /></ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toast />
      </ToastProvider>
    </AuthProvider>
  )
}

export default App