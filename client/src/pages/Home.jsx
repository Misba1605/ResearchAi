import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const features = [
  {
    number: "01",
    title: "Guided Paper Structures",
    description:
      "Start with IEEE, ACM or SCITEPRESS section guides, or create a completely blank paper."
  },
  {
    number: "02",
    title: "Simple Rich Text Editor",
    description:
      "Write using headings, basic text formatting, lists, alignment and links."
  },
  {
    number: "03",
    title: "Automatic Draft Saving",
    description:
      "Your work is saved automatically while you write and can also be saved manually."
  },
  {
    number: "04",
    title: "Personal Paper Workspace",
    description:
      "Create, reopen, continue and delete papers securely from your own account."
  }
]

const steps = [
  {
    number: "1",
    title: "Choose a structure",
    description:
      "Select a guided paper structure or begin with an empty document."
  },
  {
    number: "2",
    title: "Write section by section",
    description:
      "Replace the guidance text with your research content and format it clearly."
  },
  {
    number: "3",
    title: "Save and export",
    description:
      "Continue your work later from My Papers and export the completed draft as PDF."
  }
]

export default function Home() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="hero-bg">

      {/* Hero */}
      <section className="page-container py-16 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#cbd9ea] bg-white px-4 py-2 text-xs font-semibold text-[#315c9b] shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#315c9b]" />
              Research-paper workspace for students
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Build your research paper with a{" "}
              <span className="text-[#315c9b]">
                clear structure
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Choose a guided paper structure, write and format your
              content, save drafts automatically and export your paper as
              a PDF.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/templates"
                className="btn-primary rounded-lg px-6 py-3.5 text-sm font-semibold"
              >
                Choose a Paper Guide

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 h-4 w-4"
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
              </Link>

              <Link
                to={isLoggedIn ? "/editor/scratch" : "/register"}
                className="btn-secondary rounded-lg px-6 py-3.5 text-sm font-semibold"
              >
                {isLoggedIn
                  ? "Start with Blank Paper"
                  : "Create an Account"}
              </Link>
            </div>

            <p className="mt-5 text-xs leading-5 text-slate-500">
              Paper guides provide section-level writing support. They
              are not official publisher templates or submission-ready
              formatting files.
            </p>
          </div>

          {/* Document preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -left-5 top-12 hidden h-24 w-24 rounded-full bg-[#dfeaf7] lg:block" />
            <div className="absolute -right-6 bottom-8 hidden h-32 w-32 rounded-full border border-[#cbd9ea] lg:block" />

            <div className="relative rounded-2xl border border-slate-200 bg-[#e8edf3] p-4 shadow-xl shadow-slate-900/5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Guided structure preview
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    IEEE Paper Guide
                  </p>
                </div>

                <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                  Saved
                </span>
              </div>

              <div className="min-h-[430px] rounded-sm border border-slate-200 bg-white px-8 py-10 shadow-sm sm:px-12">
                <div className="mx-auto mb-8 h-4 w-3/4 rounded bg-slate-900" />

                <div className="mx-auto mb-3 h-2 w-1/2 rounded bg-slate-300" />
                <div className="mx-auto mb-10 h-2 w-2/5 rounded bg-slate-200" />

                <div className="mb-3 h-3 w-24 rounded bg-[#315c9b]" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-11/12 rounded bg-slate-200" />
                </div>

                <div className="mb-3 mt-8 h-3 w-32 rounded bg-[#315c9b]" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-10/12 rounded bg-slate-200" />
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-8/12 rounded bg-slate-200" />
                </div>

                <div className="mb-3 mt-8 h-3 w-28 rounded bg-[#315c9b]" />
                <div className="space-y-2">
                  <div className="h-2 w-full rounded bg-slate-200" />
                  <div className="h-2 w-9/12 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-slate-200 bg-white">
        <div className="page-container py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#315c9b]">
              Core features
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
              Everything needed for a clear first draft
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              CiteNest keeps the workflow focused: choose a structure,
              write your content, save your draft and export it.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.number}
                className="rounded-xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#b7c8dd] hover:shadow-lg hover:shadow-slate-900/5"
              >
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-[#eaf1fa] text-sm font-bold text-[#315c9b]">
                  {feature.number}
                </div>

                <h3 className="text-lg font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="page-container py-20">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#315c9b]">
            Simple workflow
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 md:text-4xl">
            From structure to saved paper
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            The project focuses on a small and practical workflow that
            students can understand immediately.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative rounded-xl border border-slate-200 bg-white p-7"
            >
              <span className="mb-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#315c9b] text-sm font-bold text-white">
                {step.number}
              </span>

              <h3 className="text-lg font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="page-container pb-24">
        <div className="rounded-2xl border border-[#cbd9ea] bg-[#eef4fb] px-6 py-12 text-center sm:px-12">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Start writing your paper
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
            Choose a guided structure or begin with a blank paper and
            build the sections yourself.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/templates"
              className="btn-primary rounded-lg px-6 py-3 text-sm font-semibold"
            >
              View Paper Guides
            </Link>

            <Link
              to={isLoggedIn ? "/my-drafts" : "/register"}
              className="btn-secondary rounded-lg px-6 py-3 text-sm font-semibold"
            >
              {isLoggedIn ? "Open My Papers" : "Create Account"}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}