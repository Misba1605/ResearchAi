import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
console.log("layout rendered");

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <Outlet />

    </div>
  )
}

export default MainLayout
