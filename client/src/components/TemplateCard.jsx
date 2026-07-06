import { useNavigate } from "react-router-dom"
import { TEMPLATES } from "../constants/templates"

export default function TemplateCard({ template }) {
  const navigate = useNavigate()

  return (
    <div className="template-card glass-card rounded-2xl overflow-hidden group cursor-pointer"
      onClick={() => navigate(`/editor/${template.id}`)}>

      {/* Header gradient bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${template.color}`} />

      <div className="p-6">
        {/* Top row */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-white">{template.name}</h3>
              {template.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r ${template.color} text-white`}>
                  {template.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">{template.fullName}</p>
          </div>
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${template.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/>
            </svg>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{template.description}</p>

        {/* Sections */}
        <div className="mb-5">
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">Sections included</p>
          <div className="flex flex-wrap gap-1.5">
            {template.sections.slice(0, 6).map((sec, i) => (
              <span key={i} className="text-[11px] bg-slate-800/80 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/50">
                {sec}
              </span>
            ))}
            {template.sections.length > 6 && (
              <span className="text-[11px] bg-slate-800/80 text-slate-400 px-2 py-0.5 rounded-md border border-slate-700/50">
                +{template.sections.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Use Button */}
        <button
          id={`use-template-${template.id}`}
          onClick={(e) => { e.stopPropagation(); navigate(`/editor/${template.id}`) }}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r ${template.color} hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg`}
        >
          Use This Template
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>
    </div>
  )
}
