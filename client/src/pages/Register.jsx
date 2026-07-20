import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import apiClient from "../api/apiClient"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"

export default function Register() {
  const navigate = useNavigate()

  const { login } = useAuth()
  const { addToast } = useToast()

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] =
    useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] =
    useState(false)

  const handleRegister = async (event) => {
    event.preventDefault()
    setError("")

    const normalizedEmail = email.trim()
    const normalizedUsername = username.trim()

    if (
      !normalizedEmail ||
      !normalizedUsername ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.")
      return
    }

    if (normalizedUsername.length < 3) {
      setError(
        "Username must be at least 3 characters."
      )
      return
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      )
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)

    try {
      const response = await apiClient.post(
        "/register",
        {
          email: normalizedEmail,
          username: normalizedUsername,
          password
        }
      )

      login(
        response.data.token,
        response.data.user
      )

      addToast(
        "Account created successfully",
        "success"
      )

      navigate("/", {
        replace: true
      })
    } catch (registerError) {
      const errorMessage =
        registerError.response?.data?.message ||
        "Registration failed. Please try again."

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
                  CiteNest
                </span>
              </Link>

              <div className="mt-20">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#315c9b]">
                  Create your workspace
                </p>

                <h1 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-tight text-slate-950">
                  Keep your research-paper drafts organised.
                </h1>

                <p className="mt-5 max-w-md leading-8 text-slate-600">
                  Create an account to use guided paper
                  structures, save your drafts and continue
                  writing later.
                </p>
              </div>
            </div>

            <div className="space-y-4 border-t border-[#cbd9ea] pt-7">
              {[
                "Choose IEEE, ACM or SCITEPRESS guides",
                "Save papers automatically while writing",
                "Manage drafts from one workspace"
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

          {/* Registration form */}
          <section className="px-6 py-10 sm:px-10 md:px-14 lg:px-16 lg:py-14">
            <div className="mx-auto max-w-md">

              {/* Mobile brand */}
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2 lg:hidden"
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
                  CiteNest
                </span>
              </Link>

              <h2 className="text-3xl font-bold tracking-tight text-slate-950">
                Create your account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                Create an account to save and manage your
                research papers.
              </p>

              <form
                onSubmit={handleRegister}
                className="mt-8 space-y-4"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="register-email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address
                  </label>

                  <input
                    id="register-email"
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

                {/* Username */}
                <div>
                  <label
                    htmlFor="register-username"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Username
                  </label>

                  <input
                    id="register-username"
                    type="text"
                    required
                    minLength={3}
                    value={username}
                    onChange={(event) =>
                      setUsername(event.target.value)
                    }
                    placeholder="Choose a username"
                    autoComplete="username"
                    className="input-field"
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="register-password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      id="register-password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      required
                      minLength={6}
                      value={password}
                      onChange={(event) =>
                        setPassword(event.target.value)
                      }
                      placeholder="Minimum 6 characters"
                      autoComplete="new-password"
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

                  <p className="mt-1.5 text-xs text-slate-500">
                    Password must contain at least 6 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="register-confirm"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm password
                  </label>

                  <input
                    id="register-confirm"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    required
                    minLength={6}
                    value={confirmPassword}
                    onChange={(event) =>
                      setConfirmPassword(
                        event.target.value
                      )
                    }
                    placeholder="Enter the password again"
                    autoComplete="new-password"
                    className="input-field"
                  />
                </div>

                {/* Error */}
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
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                      />

                      <path
                        strokeLinecap="round"
                        d="M12 8v5M12 16h.01"
                      />
                    </svg>

                    <span>{error}</span>
                  </div>
                )}

                {/* Submit */}
                <button
                  id="register-submit"
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full gap-2 rounded-lg px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                  )}

                  {loading
                    ? "Creating account..."
                    : "Create Account"}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#315c9b] hover:text-[#274b80]"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}