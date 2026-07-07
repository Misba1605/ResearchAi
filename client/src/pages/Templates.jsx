import { useNavigate } from "react-router-dom"
import TemplateCard from "../components/TemplateCard"
import { TEMPLATES } from "../constants/templates"

export default function Templates() {
  const navigate = useNavigate()

  return (
    <div className="hero-bg min-h-screen">
      <main className="page-container py-14 md:py-20">

        {/* Page header */}
        <section className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#315c9b]">
            Paper guides
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
            Choose a structure for your paper
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
            Start with section guidance based on commonly used IEEE,
            ACM or SCITEPRESS paper structures, or create your own
            structure using a blank paper.
          </p>
        </section>

        {/* Blank paper */}
        <section className="mt-12">
          <button
            type="button"
            onClick={() => navigate("/editor/scratch")}
            className="group flex w-full flex-col items-start gap-5 rounded-xl border border-dashed border-[#aebed2] bg-white p-6 text-left transition-all hover:-translate-y-0.5 hover:border-[#315c9b] hover:shadow-lg hover:shadow-slate-900/5 sm:flex-row sm:items-center"
          >
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[#eaf1fa] text-[#315c9b]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20h9"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4L16.5 3.5Z"
                />
              </svg>
            </div>

            <div className="flex-1">
              <h2 className="text-lg font-semibold text-slate-900">
                Start with a Blank Paper
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                Open an empty editor and create your own headings and
                paper structure.
              </p>
            </div>

            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#315c9b]">
              Open Blank Paper

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9 18 6-6-6-6"
                />
              </svg>
            </span>
          </button>
        </section>

        {/* Guided templates */}
        <section className="mt-14">
          <div className="mb-7">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Guided paper structures
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Each guide includes common section headings and short
              instructions explaining what to write.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TEMPLATES.map((template) => (
              <TemplateCard
                key={template.id}
                template={template}
              />
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-14 rounded-xl border border-slate-200 bg-white px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="12" cy="12" r="9" />
                <path
                  strokeLinecap="round"
                  d="M12 11v5M12 8h.01"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                About these paper guides
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                These guides provide section-level writing support.
                They are not official publisher templates or
                submission-ready formatting files.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}