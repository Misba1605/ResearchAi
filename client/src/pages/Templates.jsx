import { useNavigate } from "react-router-dom"
import { TEMPLATES } from "../constants/templates"
import TemplateCard from "../components/TemplateCard"

export default function Templates() {
  const navigate = useNavigate()

  return (
    <div className="hero-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 border border-indigo-500/20">
            <span className="text-base">📋</span> Research Paper Structure
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Choose Your <span className="gradient-text">Template Guide</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Each template comes with a guide of pre-filled with all the required sections for that publication format.
            Just add your content.
          </p>
        </div>

        {/* Or start from scratch */}
        <div
          onClick={() => navigate("/editor/scratch")}
          className="glass-card rounded-2xl p-6 mb-10 border border-dashed border-indigo-500/30 hover:border-indigo-400/60 cursor-pointer flex items-center gap-5 group transition-all duration-300"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform">
            ✏️
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-white text-lg">Start from Scratch</h3>
            <p className="text-slate-400 text-sm">Open a blank editor with the full toolbar. Build your own paper structure from the ground up.</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Open Blank Editor →
            </div>
          </div>
        </div>

        {/* Template Grid */}
        {TEMPLATES.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
            {TEMPLATES.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
          </div>
        )}

        {/* Bottom note */}
       {/* Bottom note */}
        <div className="text-center mt-14 text-slate-500 text-sm">
        <p>
        These guides provide section-level writing support.
        They are not official publisher templates or submission-ready formatting files.
        </p>
       </div>
      </div>
    </div>

   

  )

}

 
