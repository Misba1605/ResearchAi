import { useNavigate } from "react-router-dom"

const TEMPLATE_STYLES = {
  ieee: {
    label: "Engineering and technical research",
    topBorder: "bg-blue-600",
    iconBackground: "bg-blue-50",
    iconColor: "text-blue-700",
    sectionBackground: "bg-blue-50",
    sectionText: "text-blue-700",
    sectionBorder: "border-blue-100"
  },

  acm: {
    label: "Computing research",
    topBorder: "bg-emerald-600",
    iconBackground: "bg-emerald-50",
    iconColor: "text-emerald-700",
    sectionBackground: "bg-emerald-50",
    sectionText: "text-emerald-700",
    sectionBorder: "border-emerald-100"
  },

  scitepress: {
    label: "Conference-style research",
    topBorder: "bg-violet-600",
    iconBackground: "bg-violet-50",
    iconColor: "text-violet-700",
    sectionBackground: "bg-violet-50",
    sectionText: "text-violet-700",
    sectionBorder: "border-violet-100"
  }
}

const DEFAULT_STYLE = {
  label: "Guided paper structure",
  topBorder: "bg-slate-600",
  iconBackground: "bg-slate-100",
  iconColor: "text-slate-700",
  sectionBackground: "bg-slate-100",
  sectionText: "text-slate-700",
  sectionBorder: "border-slate-200"
}

export default function TemplateCard({ template }) {
  const navigate = useNavigate()

  const style =
    TEMPLATE_STYLES[template.id] || DEFAULT_STYLE

  const openTemplate = () => {
    navigate(`/editor/${template.id}`)
  }

  return (
    <button
      type="button"
      onClick={openTemplate}
      className="template-card group flex h-full w-full flex-col overflow-hidden rounded-xl text-left"
    >
      <div className={`h-1.5 w-full ${style.topBorder}`} />

      <div className="flex flex-1 flex-col p-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
              {style.label}
            </p>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              {template.name}
            </h3>

            <p className="mt-1 text-xs font-medium text-slate-500">
              {template.fullName}
            </p>
          </div>

          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg ${style.iconBackground} ${style.iconColor}`}
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

        {/* Description */}
        <p className="mt-5 text-sm leading-7 text-slate-600">
          {template.description}
        </p>

        {/* Sections */}
        <div className="mt-6 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500">
            Sections included
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {template.sections
              .slice(0, 6)
              .map((section) => (
                <span
                  key={section}
                  className={`rounded-md border px-2.5 py-1 text-[11px] font-medium ${style.sectionBackground} ${style.sectionText} ${style.sectionBorder}`}
                >
                  {section}
                </span>
              ))}

            {template.sections.length > 6 && (
              <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-600">
                +{template.sections.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Action */}
        <div className="mt-7 flex items-center justify-between border-t border-slate-200 pt-5">
          <span className="text-sm font-semibold text-[#315c9b]">
            Use this guide
          </span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-[#315c9b] transition-transform group-hover:translate-x-1"
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
        </div>
      </div>
    </button>
  )
}