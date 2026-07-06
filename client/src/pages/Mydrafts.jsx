import { useCallback, useEffect, useState } from "react"
import apiClient from "../api/apiClient"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"

function MyDrafts() {
  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)
  const navigate = useNavigate()
  const { addToast } = useToast()

  const fetchDrafts = useCallback(async () => {
  try {
    setLoading(true)

    const res = await apiClient.get("/drafts")

    setDrafts(res.data)
  } catch (error) {
    console.error("Error fetching drafts:", error)
    addToast("Failed to load your papers", "error")
  } finally {
    setLoading(false)
  }
}, [addToast])

  useEffect(() => {
    fetchDrafts()
}, [fetchDrafts])

  const handleDelete = async (e, draftId) => {
    e.stopPropagation()
    if (!window.confirm("Are you sure you want to delete this paper?")) return

    try {
      setDeleteLoading(draftId)
      await apiClient.delete(`/drafts/${draftId}`)
      setDrafts((currentDrafts) =>
         currentDrafts.filter((draft) => draft._id !== draftId)
     )  
    addToast("Paper deleted successfully", "success")
    } catch (error) {
      console.error("Error deleting draft:", error)
      addToast("Failed to delete paper. Please try again.", "error")
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleContinueEditing = (draft) => {
    navigate(`/editor/${draft.template}?draftId=${draft._id}`)
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getTemplateColor = (template) => {
    const colors = {
      ieee: "from-blue-500 to-blue-700",
      acm: "from-red-500 to-orange-600",
      apa: "from-amber-500 to-yellow-600",
      scitepress: "from-green-500 to-teal-600",
      springer: "from-purple-500 to-indigo-600",
      scratch: "from-slate-500 to-slate-700"
    }
    return colors[template] || "from-slate-500 to-slate-700"
  }

  const getTemplateName = (template) => {
    const names = {
      ieee: "IEEE",
      acm: "ACM",
      apa: "APA",
      scitepress: "Scitepress",
      springer: "Springer",
      scratch: "Blank Paper"
    }
    return names[template] || template
  }

  return (
    <div className="hero-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 glass text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-indigo-500/20">
            <span className="text-base">📚</span> My Papers
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Your <span className="gradient-text">Research Papers</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Manage all your saved research papers. Continue editing, download, or delete them as needed.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        ) : drafts.length === 0 ? (
          /* Empty State */
          <div className="glass-card rounded-3xl p-12 text-center border border-dashed border-indigo-500/30">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-white mb-2">No papers yet</h3>
            <p className="text-slate-400 mb-6">Start by creating your first research paper using a template or from scratch.</p>
            <button
              onClick={() => navigate("/templates")}
              className="btn-primary text-white font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create New Paper
            </button>
          </div>
        ) : (
          
           


           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drafts.map((draft) => (
              <div
                key={draft._id}
                className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 group cursor-pointer"
                onClick={() => handleContinueEditing(draft)}
              >
                {/* Template Badge */}
                <div className={`inline-flex text-xs font-semibold text-white px-3 py-1 rounded-full bg-gradient-to-r ${getTemplateColor(draft.template)} mb-4`}>
                  {getTemplateName(draft.template)}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                  {draft.title || "Untitled Paper"}
                </h3>

                {/* Dates */}
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Created: {formatDate(draft.createdAt)}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Updated: {formatDate(draft.updatedAt)}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-700/50">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleContinueEditing(draft) }}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={(e) => handleDelete(e, draft._id)}
                    disabled={deleteLoading === draft._id}
                    className="flex items-center justify-center gap-1.5 bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 text-xs font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deleteLoading === draft._id ? (
                      <div className="w-3.5 h-3.5 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyDrafts