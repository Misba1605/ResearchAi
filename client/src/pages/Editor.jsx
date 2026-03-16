import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function Editor() {

  const { templateName } = useParams()
  const storageKey = `draft-${templateName}`

  const [status, setStatus] = useState("Saved")

  const [title, setTitle] = useState("")
  const [authors, setAuthors] = useState("")
  const [abstract, setAbstract] = useState("")
  const [keywords, setKeywords] = useState("")
  const [introduction, setIntroduction] = useState("")
  const [methodology, setMethodology] = useState("")
  const [results, setResults] = useState("")
  const [conclusion, setConclusion] = useState("")
  const [references, setReferences] = useState("")

  // Load draft when page opens
  useEffect(() => {

    const savedDraft = localStorage.getItem(storageKey)

    if (savedDraft) {
      const data = JSON.parse(savedDraft)

      setTitle(data.title || "")
      setAuthors(data.authors || "")
      setAbstract(data.abstract || "")
      setKeywords(data.keywords || "")
      setIntroduction(data.introduction || "")
      setMethodology(data.methodology || "")
      setResults(data.results || "")
      setConclusion(data.conclusion || "")
      setReferences(data.references || "")
    }

  }, [storageKey])

  // Auto save
  useEffect(() => {

    setStatus("Saving...")

    const timer = setTimeout(() => {

      const draft = {
        title,
        authors,
        abstract,
        keywords,
        introduction,
        methodology,
        results,
        conclusion,
        references
      }

      localStorage.setItem(storageKey, JSON.stringify(draft))

      setStatus("Saved")

    }, 2000)

    return () => clearTimeout(timer)

  }, [
    title,
    authors,
    abstract,
    keywords,
    introduction,
    methodology,
    results,
    conclusion,
    references,
    storageKey
  ])

  return (

    <div className="flex justify-center bg-gray-200 min-h-screen py-10">

      <div className="bg-white text-black w-[800px] p-12 shadow-lg">

        {/* Title */}
        <textarea
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Paper Title"
          className="w-full text-3xl font-bold text-center border-none outline-none resize-none mb-4"
        />

        {/* Authors */}
        <textarea
          value={authors}
          onChange={(e) => setAuthors(e.target.value)}
          placeholder="Author Names"
          className="w-full text-center border-none outline-none resize-none mb-10"
        />

        {/* Abstract */}
        <h2 className="font-bold uppercase mb-2">Abstract</h2>

        <textarea
          value={abstract}
          onChange={(e) => setAbstract(e.target.value)}
          placeholder="Write abstract..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        {/* Keywords */}
        <h2 className="font-bold uppercase mb-2">Keywords</h2>

        <textarea
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="keyword1, keyword2..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        {/* Introduction */}
        <h2 className="font-bold mb-2">1. Introduction</h2>

        <textarea
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Write introduction..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        {/* Methodology */}
        <h2 className="font-bold mb-2">2. Methodology</h2>

        <textarea
          value={methodology}
          onChange={(e) => setMethodology(e.target.value)}
          placeholder="Explain methodology..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        {/* Results */}
        <h2 className="font-bold mb-2">3. Results</h2>

        <textarea
          value={results}
          onChange={(e) => setResults(e.target.value)}
          placeholder="Write results..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        {/* Conclusion */}
        <h2 className="font-bold mb-2">4. Conclusion</h2>

        <textarea
          value={conclusion}
          onChange={(e) => setConclusion(e.target.value)}
          placeholder="Write conclusion..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        {/* References */}
        <h2 className="font-bold mb-2">References</h2>

        <textarea
          value={references}
          onChange={(e) => setReferences(e.target.value)}
          placeholder="[1] Reference..."
          className="w-full border-none outline-none resize-none mb-6"
        />

        <p className="text-gray-500 text-sm mt-4">
          {status}
        </p>

      </div>

    </div>
  )
}

export default Editor