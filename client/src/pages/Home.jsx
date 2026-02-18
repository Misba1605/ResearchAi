import { Link } from "react-router-dom"



function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center h-[80vh] px-6">
      
      <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
        Create Research Papers <br />
        <span className="text-blue-500">Without Formatting Stress</span>
      </h1>

      <p className="mt-6 text-gray-400 max-w-2xl text-lg">
        Generate professional research papers using IEEE, Scitepress and other
        publication templates. Write, edit, save drafts and download as PDF —
        all in one place.
      </p>

      <div className="mt-8 flex gap-6">
        <Link
          to="/templates"
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
        >
          Explore Templates
        </Link>

        <Link
          to="/login"
          className="border border-gray-600 hover:border-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>
      </div>

    </section>
  )
}

export default Home
