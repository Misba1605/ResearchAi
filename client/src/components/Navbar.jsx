import { Link, useNavigate } from "react-router-dom"

function Navbar() {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white">

      {/* Left side (Logo) */}
      <h1 className="text-xl font-bold tracking-wide">
        Research App
      </h1>

      {/* Middle (Links) */}
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/templates" className="hover:text-blue-400">Templates</Link>
      </div>

      {/* Right side (Auth) */}
      {!token ? (
        <div className="flex space-x-4">
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer text-blue-400 hover:underline"
          >
            Login
          </span>

          <span
            onClick={() => navigate("/register")}
            className="cursor-pointer text-green-400 hover:underline"
          >
            Register
          </span>
        </div>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      )}

    </nav>
  )
}

export default Navbar