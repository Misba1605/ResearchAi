import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-gray-800 px-8 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">ResearchBuilder</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/templates" className="hover:text-blue-400">Templates</Link>
        <Link to="/login" className="hover:text-blue-400">Login</Link>
      </div>
    </nav>
  )
}

export default Navbar
