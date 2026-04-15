import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function MyDrafts() {
  const [drafts, setDrafts] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchDrafts()
  }, [])

  const fetchDrafts = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get("http://localhost:5000/api/drafts", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setDrafts(res.data)
    } catch (error) {
      console.log("Error fetching drafts:", error)
    }
  }

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">My Drafts</h1>

      <div className="grid gap-4">
        {drafts.map((draft) => (
          <div
            key={draft._id}
            className="bg-gray-800 p-4 rounded cursor-pointer"
            onClick={() => navigate(`/editor/${draft.template}`)}
          >
            <h2 className="text-xl font-semibold">{draft.title}</h2>
            <p className="text-sm text-gray-400">
              Template: {draft.template}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyDrafts