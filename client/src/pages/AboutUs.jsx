import { Link } from "react-router-dom"

const team = [
  { name: "ResearchAI Platform", role: "AI-Powered Research Tool", emoji: "🎓" }
]

const faqs = [
  { q: "Is ResearchAI free to use?", a: "Yes! ResearchAI is completely free for all students and researchers. Create an account and start writing immediately." },
  { q: "Which templates are available?", a: "We provide IEEE, ACM, Scitepress, and Springer LNCS templates — the four most commonly required formats for academic submissions." },
  { q: "Is my data safe?", a: "All papers are private to your account and protected with JWT authentication. Only you can view your saved papers." },
  { q: "Can I continue editing later?", a: "Yes! Your work is auto-saved every 2 seconds to our database. Log in from any device and pick up right where you left off." },
  { q: "Can I download my paper?", a: "Yes. Once you're done, click 'Download PDF' to export your paper as a clean, properly formatted PDF document." }
]

export default function AboutUs() {
  return (
    <div className="hero-bg min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 glass text-indigo-300 text-xs font-semibold px-4 py-2 rounded-full mb-8 border border-indigo-500/20">
          <span className="text-base">📖</span> About ResearchAI
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
          Writing research papers{" "}
          <span className="gradient-text">shouldn't be painful</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
          ResearchAI was built for students and researchers who spend more time fighting formatting
          than actually writing. We handle the structure — you focus on the science.
        </p>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              Every year, millions of undergraduate and postgraduate students waste hours trying to 
              manually format their research papers according to IEEE, ACM, or other publication standards.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4">
              ResearchAI solves this by providing pre-formatted, section-ready templates that match 
              official publication guidelines. Simply choose your template, fill in your content, and download.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Our platform is built specifically for <span className="text-indigo-300 font-medium">UG and PG students</span> submitting 
              to academic conferences and journals for the first time.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "🎯", title: "Goal", desc: "Eliminate formatting friction from academic writing" },
              { icon: "👥", title: "Who It's For", desc: "UG, PG students & early-career researchers" },
              { icon: "⚡", title: "Speed", desc: "Go from blank page to formatted paper in minutes" },
              { icon: "🔒", title: "Privacy", desc: "Your work stays private — always" }
            ].map((item, i) => (
              <div key={i} className="glass-card rounded-2xl p-5">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: "📋",
              title: "Template Library",
              desc: "Choose from IEEE, ACM, Scitepress, and Springer LNCS formats. Each template comes pre-filled with all the required sections.",
              color: "from-blue-500 to-indigo-600"
            },
            {
              icon: "✏️",
              title: "Rich Text Editor",
              desc: "A powerful editor with font control, text styling, image insertion, bullet points, numbered lists, tables, and more.",
              color: "from-violet-500 to-purple-600"
            },
            {
              icon: "☁️",
              title: "Cloud Auto-Save",
              desc: "Your work is automatically saved to the cloud every 2 seconds. Login from any device and continue where you left off.",
              color: "from-cyan-500 to-teal-600"
            },
            {
              icon: "📥",
              title: "PDF Export",
              desc: "Download your completed research paper as a high-quality PDF document, ready for submission.",
              color: "from-green-500 to-emerald-600"
            },
            {
              icon: "🔐",
              title: "Secure Authentication",
              desc: "JWT-based authentication ensures your account and papers are secure. Register with email, username, and password.",
              color: "from-orange-500 to-amber-600"
            },
            {
              icon: "📚",
              title: "Paper History",
              desc: "All your papers are saved to your account. View, edit, or delete any of your past work from the My Papers dashboard.",
              color: "from-pink-500 to-rose-600"
            }
          ].map((f, i) => (
            <div key={i} className="glass-card rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-lg mb-4`}>
                {f.icon}
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-2xl p-6">
              <h3 className="font-semibold text-white mb-2 flex items-start gap-2">
                <span className="text-indigo-400 text-sm mt-0.5 flex-shrink-0">Q.</span>
                {faq.q}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed pl-5">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-6 py-12 pb-24 text-center">
        <div className="glass-card rounded-3xl p-12 border border-indigo-500/20">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Create a free account and write your first research paper in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn-primary text-white font-semibold px-8 py-4 rounded-xl inline-block">
              Create Free Account
            </Link>
            <Link to="/templates" className="glass border border-white/10 hover:border-white/20 text-white font-semibold px-8 py-4 rounded-xl inline-block transition-all">
              View Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
