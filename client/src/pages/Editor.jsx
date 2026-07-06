import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react"
import {
  useNavigate,
  useParams,
  useSearchParams
} from "react-router-dom"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import html2pdf from "html2pdf.js"
import apiClient from "../api/apiClient"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { getTemplateById } from "../constants/templates"

const TOOLBAR_OPTIONS = [
  [{ font: [] }, { size: ["small", false, "large", "huge"] }],
  ["bold", "italic", "underline", "strike"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ header: [1, 2, 3, 4, false] }],
  [{ align: [] }],
  [
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" }
  ],
  ["blockquote", "code-block"],
  ["link", "image"],
  ["clean"]
]

const SAVE_INTERVAL = 2000

const createSnapshot = (title, content) =>
  JSON.stringify([
    title.trim() || "Untitled Paper",
    content
  ])

export default function Editor() {
  const { templateName } = useParams()
  const [searchParams] = useSearchParams()
  const draftIdParam = searchParams.get("draftId")

  const navigate = useNavigate()
  const { logout } = useAuth()
  const { addToast } = useToast()

  const isScratch =
    templateName === "scratch" || !templateName

  const template = isScratch
    ? null
    : getTemplateById(templateName)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [draftId, setDraftId] = useState(
    draftIdParam || null
  )
  const [status, setStatus] = useState("Ready")
  const [lastSaved, setLastSaved] = useState(null)
  const [initialised, setInitialised] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [saving, setSaving] = useState(false)

  const editorRef = useRef(null)
  const autoSaveTimer = useRef(null)
  const savingRef = useRef(false)
  const lastSavedSnapshotRef = useRef("")

  // Load an existing draft or prepare a new paper.
  useEffect(() => {
    let cancelled = false

    const initialiseEditor = async () => {
      setInitialised(false)

      if (!isScratch && !template) {
        addToast("Invalid paper template", "error")
        navigate("/templates", { replace: true })
        return
      }

      try {
        let initialTitle = ""
        let initialContent = ""

        if (draftIdParam) {
          const response = await apiClient.get(
            `/drafts/${draftIdParam}`
          )

          initialTitle = response.data.title || ""
          initialContent = response.data.content || ""

          if (!cancelled) {
            setDraftId(draftIdParam)
          }
        } else if (template) {
          initialTitle = `${template.name} Research Paper`
          initialContent = template.initialContent || ""

          if (!cancelled) {
            setDraftId(null)
          }
        } else if (!cancelled) {
          setDraftId(null)
        }

        if (cancelled) {
          return
        }

        setTitle(initialTitle)
        setContent(initialContent)

        lastSavedSnapshotRef.current = createSnapshot(
          initialTitle,
          initialContent
        )

        setStatus("Ready")
        setInitialised(true)
      } catch (error) {
        if (cancelled) {
          return
        }

        console.error("Load draft error:", error)

        addToast("Unable to open this paper", "error")
        navigate("/my-drafts", { replace: true })
      }
    }

    initialiseEditor()

    return () => {
      cancelled = true
    }
  }, [
    addToast,
    draftIdParam,
    isScratch,
    navigate,
    template
  ])

  // Create the first draft, then update the same draft.
  const saveDraft = useCallback(
    async ({ force = false } = {}) => {
      if (!initialised) {
        return {
          success: false,
          reason: "not-ready"
        }
      }

      if (savingRef.current) {
        return {
          success: false,
          reason: "busy"
        }
      }

      const normalizedTitle =
        title.trim() || "Untitled Paper"

      const snapshot = createSnapshot(
        normalizedTitle,
        content
      )

      if (
        !force &&
        snapshot === lastSavedSnapshotRef.current
      ) {
        return {
          success: true,
          skipped: true
        }
      }

      savingRef.current = true
      setSaving(true)
      setStatus("Saving…")

      try {
        const payload = {
          title: normalizedTitle,
          content
        }

        if (draftId) {
          await apiClient.put(
            `/drafts/${draftId}`,
            payload
          )
        } else {
          const response = await apiClient.post(
            "/drafts",
            {
              ...payload,
              template: templateName || "scratch"
            }
          )

          const newDraftId = response.data.draft._id

          setDraftId(newDraftId)

          navigate(
            `/editor/${templateName || "scratch"}?draftId=${newDraftId}`,
            { replace: true }
          )
        }

        lastSavedSnapshotRef.current = snapshot

        setStatus("Saved ✓")
        setLastSaved(new Date())

        return {
          success: true
        }
      } catch (error) {
        console.error("Save draft error:", error)

        setStatus("Save failed")

        return {
          success: false,
          error
        }
      } finally {
        savingRef.current = false
        setSaving(false)
      }
    },
    [
      content,
      draftId,
      initialised,
      navigate,
      templateName,
      title
    ]
  )

  // Save two seconds after the user stops typing.
  useEffect(() => {
    if (!initialised || saving) {
      return
    }

    const currentSnapshot = createSnapshot(
      title,
      content
    )

    if (
      currentSnapshot === lastSavedSnapshotRef.current
    ) {
      return
    }

    setStatus("Unsaved changes")

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current)
    }

    autoSaveTimer.current = setTimeout(() => {
      void saveDraft()
    }, SAVE_INTERVAL)

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current)
      }
    }
  }, [
    content,
    initialised,
    saveDraft,
    saving,
    title
  ])

  const handleManualSave = async () => {
    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current)
    }

    const result = await saveDraft({
      force: true
    })

    if (result.success) {
      addToast(
        "Paper saved successfully",
        "success"
      )
    } else if (
      result.reason !== "busy" &&
      result.reason !== "not-ready"
    ) {
      addToast(
        "Failed to save paper",
        "error"
      )
    }
  }

  const handleDownload = async () => {
    setDownloading(true)

    const element =
      editorRef.current?.querySelector(".ql-editor")

    if (!element) {
      setDownloading(false)
      addToast("Failed to generate PDF", "error")
      return
    }

    try {
      const options = {
        margin: [15, 20],
        filename: `${title || "research-paper"}.pdf`,
        image: {
          type: "jpeg",
          quality: 0.98
        },
        html2canvas: {
          scale: 2,
          useCORS: true
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait"
        }
      }

      await html2pdf()
        .set(options)
        .from(element)
        .save()

      addToast(
        "PDF downloaded successfully",
        "success"
      )
    } catch (error) {
      console.error("PDF error:", error)

      addToast(
        "Failed to download PDF",
        "error"
      )
    } finally {
      setDownloading(false)
    }
  }

  // Temporary export. It will be removed in a later cleanup step.
  const handleDownloadDOCX = () => {
    const element =
      editorRef.current?.querySelector(".ql-editor")

    if (!element) {
      addToast("Failed to generate document", "error")
      return
    }

    try {
      const documentContent = `
        <html>
          <head>
            <meta charset="utf-8">
            <title>${title || "Research Paper"}</title>
          </head>
          <body>
            ${element.innerHTML}
          </body>
        </html>
      `

      const blob = new Blob(
        ["\ufeff", documentContent],
        {
          type: "application/msword"
        }
      )

      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.href = url
      link.download = `${title || "research-paper"}.doc`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      URL.revokeObjectURL(url)

      addToast(
        "Document downloaded successfully",
        "success"
      )
    } catch (error) {
      console.error("Document export error:", error)

      addToast(
        "Failed to download document",
        "error"
      )
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const formatTime = (date) =>
    date
      ? date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        })
      : ""

  const statusColor =
    status === "Saved ✓"
      ? "text-green-400"
      : status.includes("fail")
        ? "text-red-400"
        : "text-yellow-400"

  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">
      {/* Top Bar */}
      <div className="flex-shrink-0 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => navigate(-1)}
          className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          title="Go back"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <input
          id="paper-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter paper title…"
          className="flex-1 min-w-0 bg-slate-800/60 border border-slate-700 text-white text-sm font-medium rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 placeholder-slate-500"
        />

        {template && (
          <span
            className={`hidden sm:inline-flex text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-gradient-to-r ${template.color}`}
          >
            {template.name}
          </span>
        )}

        {isScratch && (
          <span className="hidden sm:inline-flex text-xs font-semibold text-white px-3 py-1.5 rounded-lg bg-gradient-to-r from-slate-600 to-slate-700">
            Blank Paper
          </span>
        )}

        <div className="flex items-center gap-1.5">
          {saving && (
            <div className="w-3 h-3 border-2 border-yellow-400/40 border-t-yellow-400 rounded-full animate-spin" />
          )}

          <span className={`text-xs font-medium ${statusColor}`}>
            {status}
          </span>

          {lastSaved && (
            <span className="text-xs text-slate-600 hidden md:block">
              at {formatTime(lastSaved)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            id="manual-save-btn"
            onClick={handleManualSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 7H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3m-1 4-3 3m0 0-3-3m3 3V4"
              />
            </svg>
            Save
          </button>

          <button
            id="download-pdf-btn"
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {downloading ? (
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-1m-4-4-4 4m0 0-4-4m4 4V4"
                />
              </svg>
            )}
            {downloading ? "Generating…" : "PDF"}
          </button>

          <button
            onClick={handleDownloadDOCX}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
              />
            </svg>
            DOCX
          </button>

          <button
            onClick={() => navigate("/my-drafts")}
            className="hidden sm:flex items-center gap-1.5 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z"
              />
            </svg>
            My Papers
          </button>

          <button
            onClick={handleLogout}
            className="hidden sm:flex items-center gap-1.5 border border-red-900/50 hover:border-red-500/50 text-red-400 hover:text-red-300 text-xs font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1"
              />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {/* Editor Area */}
      <div
        className="flex-1 overflow-y-auto editor-scroll-area"
        ref={editorRef}
      >
        <div className="max-w-[900px] mx-auto py-6">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={{ toolbar: TOOLBAR_OPTIONS }}
            formats={[
              "font",
              "size",
              "bold",
              "italic",
              "underline",
              "strike",
              "color",
              "background",
              "script",
              "header",
              "align",
              "list",
              "bullet",
              "indent",
              "blockquote",
              "code-block",
              "link",
              "image",
              "clean"
            ]}
            placeholder={
              isScratch
                ? "Start writing your research paper…"
                : "Add your content to each section below…"
            }
            style={{ height: "auto" }}
          />
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="flex-shrink-0 bg-slate-900/90 border-t border-slate-800 px-4 py-1.5 flex items-center justify-between text-xs text-slate-500">
        <span>
          {template
            ? `${template.fullName} format`
            : "Blank Paper"}

          {draftId && (
            <span className="ml-3 text-slate-600">
              ID: {draftId.slice(-6)}
            </span>
          )}
        </span>

        <span className={statusColor}>
          {status}
          {lastSaved
            ? ` · ${formatTime(lastSaved)}`
            : ""}
        </span>
      </div>
    </div>
  )
}
