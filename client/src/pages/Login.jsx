import { useState } from "react"
import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom"

import apiClient from "../api/apiClient"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const { login } = useAuth()
  const { addToast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setError("")

    if (!email.trim() || !password) {
      setError("Please fill in all fields.")
      return
    }

    setLoading(true)

    try {
      const response = await apiClient.post("/login", {
        email: email.trim(),
        password
      })

      login(
        response.data.token,
        response.data.user
      )

      addToast("Login successful", "success")

      const previousLocation = location.state?.from

      const destination =
        typeof previousLocation === "string"
          ? previousLocation
          : previousLocation?.pathname
            ? `${previousLocation.pathname}${previousLocation.search || ""}`
            : "/"

      navigate(destination, {
        replace: true
      })
    } catch (loginError) {
      const errorMessage =
        loginError.response?.data?.message ||
        "Login failed. Please try again."

      setError(errorMessage)
      addToast(errorMessage, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hero-bg min-h-screen">
      <main className="page-container flex min-h-[calc(100vh-64px)] items-center py-12 md:py-16">
        <div className="grid w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:grid-cols-[0.9fr_1.1fr]">

          {/* Information panel */}
          <section className="hidden bg-[#eef4fb] p-12 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#315c9b] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 3.75h7.5L19 8.25v12H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 3.75v4.5h5M8.5 12h7M8.5 15.5h7"
                    />
                  </svg>
                </div>

                <span className="text-xl font-bold text-slate-950">
                  PaperFlow
                </span>
              </Link>

              <div className="mt-20">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#315c9b]">
                  Your paper workspace
                </p>

                <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight text-slate-950">
                  Continue working on your saved papers.
                </h1>

                <p className="mt-5 max-w-md leading-8 text-slate-600">
                  Sign in to reopen drafts, continue editing,
                  manage your papers and export completed work
                  as PDF.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#cbd9ea] pt-7">
              {[
                "Access your personal papers",
                "Continue from your latest saved version",
                "Create papers from guided structures"
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-700"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[#315c9b]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m5 12 4 4L19 6"
                      />
                    </svg>
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Login form */}
          <section className="px-6 py-10 sm:px-10 md:px-14 lg:px-16 lg:py-16">
            <div className="mx-auto max-w-md">
              <Link
                to="/"
                className="mb-10 inline-flex items-center gap-2 lg:hidden"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#315c9b] text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 3.75h7.5L19 8.25v12H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 3.75v4.5h5M8.5 12h7M8.5 15.5h7"
                    />
                  </svg>
                </div>

                <span className="text-lg font-bold text-slate-950">
                  PaperFlow
                </span>
              </Link>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Sign in to access your saved papers.
              </p>

              <form
                onSubmit={handleLogin}
                className="mt-9 space-y-5"
              >
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="input-field"
                  />
                </div>

                <div>
                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="login-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="input-field pr-16"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          (current) => !current
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#315c9b] hover:text-[#274b80]"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mt-0.5 h-4 w-4 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="9" />
                      <path
                        strokeLinecap="round"
                        d="M12 8v5M12 16h.01"
                      />
                    </svg>

                    <span>{error}</span>
                  </div>
                )}

                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full gap-2 rounded-lg px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}

                  {loading
                    ? "Signing in..."
                    : "Sign In"}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-600">
                New to PaperFlow?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-[#315c9b] hover:text-[#274b80]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}