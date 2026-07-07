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
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic", "underline"],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ align: [] }],
  ["link"],
  ["clean"]
]

const EDITOR_FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "link"
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
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const editorRef = useRef(null)
  const autoSaveTimer = useRef(null)
  const savingRef = useRef(false)
  const lastSavedSnapshotRef = useRef("")

  // Load an existing draft or prepare a new paper.
  useEffect(() => {
    let cancelled = false

    const initialiseEditor = async () => {
      setInitialised(false)

      if (
        !draftIdParam &&
        !isScratch &&
        !template
      ) {
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

  // Create the first draft, then update that same draft.
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
      setStatus("Saving...")

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

        setStatus("Saved")
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

  const paperTypeName = template
    ? template.name
    : "Blank Paper"

  const paperTypeDescription = template
    ? template.fullName
    : "Create your own paper structure"

  const getStatusStyle = () => {
    if (status === "Saved") {
      return {
        container:
          "border-emerald-200 bg-emerald-50 text-emerald-700",
        dot: "bg-emerald-500"
      }
    }

    if (status.includes("failed")) {
      return {
        container:
          "border-red-200 bg-red-50 text-red-700",
        dot: "bg-red-500"
      }
    }

    if (
      status === "Saving..." ||
      status === "Unsaved changes"
    ) {
      return {
        container:
          "border-amber-200 bg-amber-50 text-amber-700",
        dot: "bg-amber-500"
      }
    }

    return {
      container:
        "border-slate-200 bg-slate-50 text-slate-600",
      dot: "bg-slate-400"
    }
  }

  const statusStyle = getStatusStyle()

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#e9edf2]">

      {/* Editor header */}
      <header className="flex-shrink-0 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center">

          {/* Back and title */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              title="Go back"
              aria-label="Go back"
              className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-950"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>

            <div className="min-w-0 flex-1">
              <label
                htmlFor="paper-title"
                className="sr-only"
              >
                Paper title
              </label>

              <input
                id="paper-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Untitled Paper"
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none transition focus:border-[#315c9b] focus:ring-2 focus:ring-[#315c9b]/10"
              />
            </div>
          </div>

          {/* Paper type and status */}
          <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
            <div className="hidden rounded-lg border border-[#cbd9ea] bg-[#eef4fb] px-3 py-2 sm:block">
              <p className="text-xs font-semibold text-[#315c9b]">
                {paperTypeName}
              </p>
            </div>

            <div
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold ${statusStyle.container}`}
            >
              {saving ? (
                <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
              ) : (
                <span
                  className={`h-2 w-2 rounded-full ${statusStyle.dot}`}
                />
              )}

              <span>{status}</span>

              {lastSaved && (
                <span className="hidden font-normal opacity-75 md:inline">
                  at {formatTime(lastSaved)}
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
            <button
              id="manual-save-btn"
              type="button"
              onClick={handleManualSave}
              disabled={saving || !initialised}
              className="btn-secondary gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 4h11l3 3v13H5V4Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 4v6h8V4M8 20v-6h8v6"
                />
              </svg>

              Save
            </button>

            <button
              id="download-pdf-btn"
              type="button"
              onClick={handleDownload}
              disabled={downloading || !initialised}
              className="btn-primary gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0 4-4m-4 4-4-4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 19h14"
                  />
                </svg>
              )}

              {downloading
                ? "Generating..."
                : "Download PDF"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/my-drafts")}
              className="hidden rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:inline-flex"
            >
              My Papers
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 transition-colors hover:bg-red-50 hover:text-red-700 md:inline-flex"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Paper information */}
      <div className="flex-shrink-0 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 text-xs sm:px-6">
          <div className="min-w-0">
            <span className="font-semibold text-slate-700">
              {paperTypeName}
            </span>

            <span className="hidden text-slate-500 sm:inline">
              {" "}
              · {paperTypeDescription}
            </span>
          </div>

          <span className="flex-shrink-0 text-slate-500">
            Autosaves after 2 seconds
          </span>
        </div>
      </div>

      {/* Editor workspace */}
      <main
        ref={editorRef}
        className="editor-scroll-area flex-1 overflow-y-auto"
      >
        <div className="mx-auto max-w-[930px] py-3 sm:py-6">
          {!initialised && (
            <div className="mb-4 flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#315c9b]/30 border-t-[#315c9b]" />
              Opening paper...
            </div>
          )}

          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            readOnly={!initialised}
            modules={{
              toolbar: TOOLBAR_OPTIONS
            }}
            formats={EDITOR_FORMATS}
            placeholder={
              isScratch
                ? "Start writing your research paper..."
                : "Replace the guidance under each section with your content..."
            }
          />
        </div>
      </main>

      {/* Bottom status */}
      <footer className="flex-shrink-0 border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs sm:px-6">
          <span className="truncate text-slate-500">
            {draftId
              ? "Saved paper"
              : "New paper"}
          </span>

          <span
            className={`flex-shrink-0 font-medium ${
              status === "Saved"
                ? "text-emerald-700"
                : status.includes("failed")
                  ? "text-red-700"
                  : "text-slate-600"
            }`}
          >
            {status}

            {lastSaved
              ? ` · ${formatTime(lastSaved)}`
              : ""}
          </span>
        </div>
      </footer>
    </div>
  )
}