export const TEMPLATES = [
  {
    id: "ieee",
    name: "IEEE Paper Guide",
    fullName: "IEEE-style section structure",
    description:
      "A guided section structure commonly used for technical and engineering research papers.",
    color: "from-blue-500 to-indigo-600",
    sections: [
      "Title",
      "Author Information",
      "Abstract",
      "Keywords",
      "Introduction",
      "Related Work",
      "Methodology",
      "Results and Discussion",
      "Conclusion",
      "References"
    ],
    initialContent: `
<h1>Paper Title</h1>
<p><em>Enter a clear and specific title for your research paper.</em></p>

<h2>Author Information</h2>
<p><em>Add author names, department, institution and email addresses.</em></p>

<h2>Abstract</h2>
<p><em>Briefly summarize the problem, method, important results and conclusion.</em></p>

<h2>Keywords</h2>
<p><em>Add important terms that describe the main topic of the paper.</em></p>

<h2>1. Introduction</h2>
<p><em>Introduce the topic, background, research problem and objectives.</em></p>

<h2>2. Related Work</h2>
<p><em>Discuss important existing studies and explain the research gap.</em></p>

<h2>3. Methodology or Proposed System</h2>
<p><em>Explain the method, system design, dataset, tools or procedure used.</em></p>

<h2>4. Results and Discussion</h2>
<p><em>Present the results and explain their meaning.</em></p>

<h2>5. Conclusion</h2>
<p><em>Summarize the work, limitations and possible future improvements.</em></p>

<h2>References</h2>
<p><em>Add all sources cited in the paper.</em></p>
`
  },

  {
    id: "acm",
    name: "ACM Paper Guide",
    fullName: "ACM-style section structure",
    description:
      "A guided structure for computing research papers, including CCS Concepts and keywords.",
    color: "from-emerald-500 to-teal-600",
    sections: [
      "Title",
      "Author Information",
      "Abstract",
      "CCS Concepts",
      "Keywords",
      "Introduction",
      "Related Work",
      "Methodology",
      "Evaluation",
      "Discussion",
      "Conclusion",
      "References"
    ],
    initialContent: `
<h1>Paper Title</h1>
<p><em>Enter a clear title describing the research topic.</em></p>

<h2>Author Information</h2>
<p><em>Add author names, affiliations and contact details.</em></p>

<h2>Abstract</h2>
<p><em>Summarize the problem, proposed approach, major findings and conclusion.</em></p>

<h2>CCS Concepts</h2>
<p><em>Add the relevant ACM Computing Classification System concepts.</em></p>

<h2>Keywords</h2>
<p><em>Add keywords that describe the subject of the paper.</em></p>

<h2>1. Introduction</h2>
<p><em>Explain the background, motivation, problem and contribution of the work.</em></p>

<h2>2. Related Work</h2>
<p><em>Review related research and explain how this work differs.</em></p>

<h2>3. Methodology</h2>
<p><em>Describe the research method, system design, data or implementation process.</em></p>

<h2>4. Evaluation and Results</h2>
<p><em>Explain how the work was evaluated and present the results.</em></p>

<h2>5. Discussion</h2>
<p><em>Interpret the findings, limitations and practical implications.</em></p>

<h2>6. Conclusion</h2>
<p><em>Summarize the contribution and mention possible future work.</em></p>

<h2>References</h2>
<p><em>Add all sources cited in the paper.</em></p>
`
  },

  {
    id: "scitepress",
    name: "SCITEPRESS Paper Guide",
    fullName: "SCITEPRESS-style section structure",
    description:
      "A simple guided structure based on sections commonly used in SCITEPRESS conference papers.",
    color: "from-violet-500 to-purple-600",
    sections: [
      "Title",
      "Author Information",
      "Abstract",
      "Keywords",
      "Introduction",
      "Related Work",
      "Methodology",
      "Results and Discussion",
      "Conclusions",
      "References"
    ],
    initialContent: `
<h1>Paper Title</h1>
<p><em>Enter a concise title that clearly represents the paper.</em></p>

<h2>Author Information</h2>
<p><em>Add author names, affiliations and email addresses.</em></p>

<h2>Abstract</h2>
<p><em>Briefly explain the purpose, method, results and main conclusion.</em></p>

<h2>Keywords</h2>
<p><em>Add important keywords related to the research topic.</em></p>

<h2>1. Introduction</h2>
<p><em>Introduce the subject, motivation, problem and objectives.</em></p>

<h2>2. Related Work</h2>
<p><em>Discuss existing approaches and identify the gap addressed by the paper.</em></p>

<h2>3. Methodology</h2>
<p><em>Describe the proposed approach, system, experiment or research procedure.</em></p>

<h2>4. Results and Discussion</h2>
<p><em>Present the findings and explain their significance.</em></p>

<h2>5. Conclusions</h2>
<p><em>Summarize the work, limitations and possible future research.</em></p>

<h2>References</h2>
<p><em>Add all sources cited in the paper.</em></p>
`
  }
]

export const getTemplateById = (id) => {
  return (
    TEMPLATES.find(
      (template) => template.id === id?.toLowerCase()
    ) || null
  )
}