import { useNavigate } from "react-router-dom"


function TemplateCard({ title, description }) {
    const navigate = useNavigate()
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:scale-105 transition duration-300">
      <h3 className="text-2xl font-bold text-blue-400">{title}</h3>
      <p className="mt-3 text-gray-400">{description}</p>

      <button 
      onClick={() => navigate(`/editor/${title}`)}
      className="mt-6 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition">
       

        Use Template
      </button>
    </div>
  )
}

export default TemplateCard
