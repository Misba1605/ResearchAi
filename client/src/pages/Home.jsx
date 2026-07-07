import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const features = [
  {
    icon: "📄",
    title: "4 Research Templates",
    desc: "IEEE, ACM, Scitepress & Springer LNCS — all pre-formatted with the guided section structure."
  },
  {
    icon: "✏️",
    title: "Rich Text Editor",
    desc: "Bold, italic, fonts, sizes, colors, bullet lists, numbered lists, and more."
  },
  {
    icon: "☁️",
    title: "Auto-Save Every 2s",
    desc: "Never lose your work. Your paper is continuously saved to the cloud as you type."
  },
  {
    icon: "📥",
    title: "Download as PDF",
    desc: "Export your completed research paper as a clean, print-ready PDF with one click."
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "JWT-authenticated accounts. Your papers are private and only visible to you."
  },
  {
    icon: "📚",
    title: "Work History",
    desc: "All your papers are stored in your account. Continue from where you left off, anytime."
  }
]

const stats = [
  { value: "4", label: "Paper Templates" },
  { value: "100%", label: "Free to Use" },
  { value: "2s", label: "Auto-Save Interval" },
  { value: "∞", label: "Papers Saved" }
]

export default function Home() {
  const { isLoggedIn } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="hero-bg min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">

        {/* Badge */}
      <div className="inline-flex items-center gap-2 glass text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-indigo-500/20">
       <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-pulse" />
           Guided research paper workspace
        </div>

        {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
      Build Your Research Paper{" "}
       <span className="gradient-text block">with a Clear Structure</span>
        </h1>

       <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Choose a guided paper structure, write and format your content,
          save drafts automatically, and export your paper as a PDF.
       </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button
            onClick={() => navigate(isLoggedIn ? "/editor/scratch" : "/register")}
            className="btn-primary text-white font-semibold px-8 py-4 rounded-xl text-base shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {isLoggedIn ? "Create New Paper" : "Get Started Free"}
          </button>

          <button
            onClick={() => navigate(isLoggedIn ? "/templates" : "/login")}
            className="glass border border-indigo-500/30 hover:border-indigo-400/60 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h8" />
            </svg>
            Explore Templates
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((s, i) => (
            <div key={i} className="glass-card rounded-2xl p-4 text-center">
              <div className="text-3xl font-black gradient-text">{s.value}</div>
              <div className="text-slate-400 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-slate-400 max-w-lg mx-auto">Three simple steps to your finished research paper</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Choose or Start Blank", desc: "Pick from IEEE, ACM, or Scitepress or start with a blank editor.", icon: "🗂️" },
            { step: "02", title: "Write Your Content", desc: "Fill in your sections using the full-featured rich text editor with image & table support.", icon: "✍️" },
            { step: "03", title: "Download as PDF", desc: "When you're done, download your finished paper as a clean, properly formatted PDF.", icon: "📥" }
          ].map((item, i) => (
            <div key={i} className="glass-card rounded-2xl p-8 relative overflow-hidden group hover:border-indigo-500/30 transition-all duration-300">
              <div className="text-6xl font-black text-indigo-500/10 absolute top-4 right-6 select-none group-hover:text-indigo-500/20 transition-colors">
                {item.step}
              </div>
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-lg font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 py-10 pb-24">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Everything You Need</h2>
          <p className="text-slate-400 max-w-lg mx-auto">All the tools to write, format, and export professional research papers</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="relative rounded-3xl overflow-hidden glass-card border border-indigo-500/20 p-12 text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-violet-600/10 to-cyan-600/10" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to write your paper?</h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Join thousands of students who use PaperFlow to write better papers, faster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={isLoggedIn ? "/editor/scratch" : "/register"}
                className="btn-primary text-white font-semibold px-8 py-4 rounded-xl text-base inline-block"
              >
                {isLoggedIn ? "Open Editor" : "Create Free Account"}
              </Link>
              <Link
                to="/templates"
                className="glass border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-xl text-base inline-block transition-all"
                >
               View Paper Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
