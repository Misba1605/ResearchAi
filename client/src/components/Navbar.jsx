import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()

  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate("/")
  }

  const handleNewPaper = () => {
    setMenuOpen(false)
    navigate("/editor/scratch")
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  const navLink = (to, label) => {
    const active = isActive(to)

    return (
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        className={`relative py-2 text-sm font-medium transition-colors ${
          active
            ? "text-[#315c9b]"
            : "text-slate-600 hover:text-slate-950"
        }`}
      >
        {label}

        {active && (
          <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#315c9b]" />
        )}
      </Link>
    )
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Brand */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#315c9b] text-white shadow-sm">
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

            <div className="leading-tight">
              <span className="block text-lg font-bold tracking-tight text-slate-900">
                CiteNest
              </span>
              <span className="hidden text-[10px] font-medium uppercase tracking-[0.14em] text-slate-400 sm:block">
                Research workspace
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLink("/", "Home")}
            {navLink("/templates", "Paper Guides")}

            {isLoggedIn && navLink("/my-drafts", "My Papers")}
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 md:flex">
            {isLoggedIn ? (
              <>
                <button
                  type="button"
                  onClick={handleNewPaper}
                  className="btn-primary gap-2 rounded-lg px-4 py-2 text-sm font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>

                  New Paper
                </button>

                <div className="ml-1 flex items-center gap-2 border-l border-slate-200 pl-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf1fa] text-xs font-bold text-[#315c9b]">
                    {user?.username?.[0]?.toUpperCase() || "U"}
                  </div>

                  <span className="max-w-[110px] truncate text-sm font-medium text-slate-700">
                    {user?.username}
                  </span>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-950"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="btn-primary rounded-lg px-4 py-2 text-sm font-semibold"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile button */}
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
            className="rounded-lg border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50 md:hidden"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-2">
              {navLink("/", "Home")}
              {navLink("/templates", "Paper Guides")}

              {isLoggedIn && navLink("/my-drafts", "My Papers")}

              <div className="mt-2 border-t border-slate-200 pt-4">
                {isLoggedIn ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eaf1fa] text-xs font-bold text-[#315c9b]">
                        {user?.username?.[0]?.toUpperCase() || "U"}
                      </div>

                      <span className="text-sm font-medium text-slate-700">
                        {user?.username}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleNewPaper}
                      className="btn-primary rounded-lg px-4 py-2.5 text-sm font-semibold"
                    >
                      New Paper
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-left text-sm font-medium text-red-700"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="text-sm font-medium text-slate-700"
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="btn-primary rounded-lg px-4 py-2.5 text-sm font-semibold"
                    >
                      Create Account
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar