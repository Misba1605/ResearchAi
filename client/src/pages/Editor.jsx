import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Editor() {

  const { templateName } = useParams();

  const storageKey = `draft-${templateName}`

  const [content, setContent] = useState("")
  const [status, setStatus] = useState("Saved")

  // Load draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey)
    if (savedDraft) {
      setContent(savedDraft)
    }
  }, [storageKey])

  // Auto-save
  useEffect(() => {
    if (!content) return

    setStatus("Saving...")

    const timer = setTimeout(() => {
      localStorage.setItem(storageKey, content)
      setStatus("Saved")
    }, 2000)

    return () => clearTimeout(timer)

  }, [content, storageKey])

  return (
    <div className="max-w-4xl mx-auto">
      
      <h2 className="text-3xl font-bold mb-6">
        {templateName} Editor
      </h2>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your research paper here..."
        className="w-full h-[70vh] bg-gray-800 p-6 rounded-xl text-white outline-none resize-none"
      ></textarea>

      <p className="text-gray-400 mt-4 text-sm">
        {status}
      </p>

    </div>
  )
}

export default Editor
