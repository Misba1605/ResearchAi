import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import apiClient from "../api/apiClient"
import { useToast } from "../context/ToastContext"

const TEMPLATE_STYLES = {
  ieee: {
    name: "IEEE Paper Guide",
    badge: "border-blue-200 bg-blue-50 text-blue-700",
    icon: "bg-blue-50 text-blue-700"
  },

  acm: {
    name: "ACM Paper Guide",
    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: "bg-emerald-50 text-emerald-700"
  },

  scitepress: {
    name: "SCITEPRESS Paper Guide",
    badge:
      "border-violet-200 bg-violet-50 text-violet-700",
    icon: "bg-violet-50 text-violet-700"
  },

  scratch: {
    name: "Blank Paper",
    badge:
      "border-slate-200 bg-slate-100 text-slate-700",
    icon: "bg-slate-100 text-slate-700"
  }
}

const DEFAULT_TEMPLATE_STYLE = {
  name: "Saved Paper",
  badge: "border-slate-200 bg-slate-100 text-slate-700",
  icon: "bg-slate-100 text-slate-700"
}

function MyDrafts() {
  const navigate = useNavigate()
  const { addToast } = useToast()

  const [drafts, setDrafts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(null)

  useEffect(() => {
    let isCancelled = false

    const loadDrafts = async () => {
      try {
        const response = await apiClient.get("/drafts")

        if (!isCancelled) {
          setDrafts(response.data)
        }
      } catch (error) {
        console.error("Error fetching drafts:", error)

        if (!isCancelled) {
          addToast(
            "Failed to load your papers",
            "error"
          )
        }
      } finally {
        if (!isCancelled) {
          setLoading(false)
        }
      }
    }

    loadDrafts()

    return () => {
      isCancelled = true
    }
  }, [addToast])

  const handleDelete = async (event, draftId) => {
    event.stopPropagation()

    const shouldDelete = window.confirm(
      "Are you sure you want to delete this paper?"
    )

    if (!shouldDelete) {
      return
    }

    try {
      setDeleteLoading(draftId)

      await apiClient.delete(`/drafts/${draftId}`)

      setDrafts((currentDrafts) =>
        currentDrafts.filter(
          (draft) => draft._id !== draftId
        )
      )

      addToast(
        "Paper deleted successfully",
        "success"
      )
    } catch (error) {
      console.error("Error deleting draft:", error)

      addToast(
        "Failed to delete paper. Please try again.",
        "error"
      )
    } finally {
      setDeleteLoading(null)
    }
  }

  const handleContinueEditing = (draft) => {
    const templateId = draft.template || "scratch"

    navigate(
      `/editor/${templateId}?draftId=${draft._id}`
    )
  }

  const formatDate = (dateString) => {
    if (!dateString) {
      return "Date unavailable"
    }

    const date = new Date(dateString)

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    })
  }

  const getTemplateStyle = (template) => {
    return (
      TEMPLATE_STYLES[template] ||
      DEFAULT_TEMPLATE_STYLE
    )
  }

  return (
    <div className="hero-bg min-h-screen">
      <main className="page-container py-14 md:py-20">

        {/* Page header */}
        <section className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#315c9b]">
              Personal workspace
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
              My Papers
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
              Open, continue or delete your saved research
              papers.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/templates")}
            className="btn-primary gap-2 self-start rounded-lg px-5 py-3 text-sm font-semibold sm:self-auto"
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
                d="M12 4v16m8-8H4"
              />
            </svg>

            New Paper
          </button>
        </section>

        {/* Paper count */}
        {!loading && drafts.length > 0 && (
          <section className="mt-10">
            <div className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">
                {drafts.length}
              </span>

              {drafts.length === 1
                ? "paper saved"
                : "papers saved"}
            </div>
          </section>
        )}

        {/* Loading state */}
        {loading ? (
          <section className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse rounded-xl border border-slate-200 bg-white p-6"
              >
                <div className="h-6 w-32 rounded bg-slate-200" />
                <div className="mt-6 h-5 w-4/5 rounded bg-slate-200" />
                <div className="mt-3 h-4 w-2/3 rounded bg-slate-100" />

                <div className="mt-8 h-4 w-full rounded bg-slate-100" />
                <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />

                <div className="mt-8 flex gap-3">
                  <div className="h-9 flex-1 rounded bg-slate-200" />
                  <div className="h-9 w-24 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </section>
        ) : drafts.length === 0 ? (
          /* Empty state */
          <section className="mt-12 rounded-2xl border border-dashed border-[#aebed2] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf1fa] text-[#315c9b]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.7}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 3.75h7.5L19 8.25v12H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 3.75v4.5h5M9 13h6M9 16h4"
                />
              </svg>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-950">
              No papers saved yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-600">
              Choose a paper guide or start with a blank
              paper to create your first draft.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/templates")}
                className="btn-primary rounded-lg px-5 py-3 text-sm font-semibold"
              >
                View Paper Guides
              </button>

              <button
                type="button"
                onClick={() =>
                  navigate("/editor/scratch")
                }
                className="btn-secondary rounded-lg px-5 py-3 text-sm font-semibold"
              >
                Start Blank Paper
              </button>
            </div>
          </section>
        ) : (
          /* Papers grid */
          <section className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {drafts.map((draft) => {
              const templateStyle =
                getTemplateStyle(draft.template)

              const isDeleting =
                deleteLoading === draft._id

              return (
                <article
                  key={draft._id}
                  className="flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:-translate-y-0.5 hover:border-[#b7c8dd] hover:shadow-lg hover:shadow-slate-900/5"
                >
                  {/* Main card content */}
                  <button
                    type="button"
                    onClick={() =>
                      handleContinueEditing(draft)
                    }
                    className="flex flex-1 flex-col p-6 text-left"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${templateStyle.badge}`}
                      >
                        {templateStyle.name}
                      </span>

                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${templateStyle.icon}`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M7 3.75h7.5L19 8.25v12H7a2 2 0 0 1-2-2V5.75a2 2 0 0 1 2-2Z"
                          />

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 3.75v4.5h5M8.5 12h7M8.5 15.5h7"
                          />
                        </svg>
                      </div>
                    </div>

                    <h2 className="mt-6 break-words text-xl font-bold leading-7 text-slate-950">
                      {draft.title || "Untitled Paper"}
                    </h2>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-0.5 h-4 w-4 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="9"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 7v5l3 2"
                          />
                        </svg>

                        <span>
                          Updated{" "}
                          {formatDate(draft.updatedAt)}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-xs leading-5 text-slate-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="mt-0.5 h-4 w-4 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.8}
                        >
                          <rect
                            x="4"
                            y="5"
                            width="16"
                            height="15"
                            rx="2"
                          />
                          <path
                            strokeLinecap="round"
                            d="M8 3v4M16 3v4M4 10h16"
                          />
                        </svg>

                        <span>
                          Created{" "}
                          {formatDate(draft.createdAt)}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Card actions */}
                  <div className="flex items-center gap-3 border-t border-slate-200 px-6 py-4">
                    <button
                      type="button"
                      onClick={() =>
                        handleContinueEditing(draft)
                      }
                      className="btn-primary flex-1 gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold"
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
                          d="M15.5 5.5 18.5 8.5M5 19l4.5-1 9-9a2.12 2.12 0 0 0-3-3l-9 9L5 19Z"
                        />
                      </svg>

                      Continue Editing
                    </button>

                    <button
                      type="button"
                      onClick={(event) =>
                        handleDelete(
                          event,
                          draft._id
                        )
                      }
                      disabled={isDeleting}
                      aria-label={`Delete ${
                        draft.title ||
                        "Untitled Paper"
                      }`}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-red-200 bg-white text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-300 border-t-red-600" />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.9}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </article>
              )
            })}
          </section>
        )}
      </main>
    </div>
  )
}

export default MyDrafts