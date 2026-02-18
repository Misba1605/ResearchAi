import Navbar from "../components/Navbar"

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="p-6">
        {children}
      </div>
    </div>
  )
}

export default MainLayout
