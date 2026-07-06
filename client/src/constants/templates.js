// ─── Research Paper Templates ─────────────────────────────────────────────────
// Full HTML content for each template with all standard sections

export const TEMPLATES = [
  {
    id: "ieee",
    name: "IEEE",
    fullName: "IEEE Conference / Journal",
    description: "Standard IEEE format used for conferences and journals worldwide. Includes all required sections as per IEEE guidelines.",
    color: "from-blue-500 to-blue-700",
    badge: "Most Popular",
    sections: ["Abstract", "Index Terms", "Introduction", "Related Work", "Methodology", "Results & Discussion", "Conclusion", "References"],
    initialContent: `
<h1 style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:6px;">Title of Your IEEE Research Paper</h1>
<p style="text-align:center; font-style:italic; margin-bottom:4px;">First Author<sup>1</sup>, Second Author<sup>2</sup>, Third Author<sup>3</sup></p>
<p style="text-align:center; font-size:12px; margin-bottom:20px;"><sup>1</sup>Department, University Name, City, Country &nbsp;|&nbsp; <sup>2</sup>Department, University Name, City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:24px;">Email: author@university.edu</p>

<h2>Abstract</h2>
<p>Write a concise summary of your research here. The abstract should briefly describe the problem, methodology, results, and conclusion in 150–250 words.</p>

<h2>Index Terms</h2>
<p>Keyword one, Keyword two, Keyword three, Keyword four, Keyword five</p>

<h2>I. Introduction</h2>
<p>Introduce your topic here. Explain the background, motivation, and significance of the research problem. State the objectives and contributions of your paper clearly.</p>

<h2>II. Related Work</h2>
<p>Discuss existing literature and research related to your topic. Highlight gaps in existing work that your paper addresses.</p>

<h2>III. Methodology</h2>
<p>Describe your research methodology, experimental setup, datasets used, algorithms, and any theoretical framework in detail.</p>

<h2>IV. Results and Discussion</h2>
<p>Present your results with supporting data, graphs, and tables. Analyze and discuss the significance of your findings.</p>

<h2>V. Conclusion</h2>
<p>Summarize the key contributions of your paper, limitations, and future research directions.</p>

<h2>References</h2>
<p>[1] A. Author, B. Author, "Title of Paper," <em>Journal Name</em>, vol. 1, no. 1, pp. 1–10, 2024.</p>
<p>[2] C. Author, "Title of Conference Paper," in <em>Proc. Int. Conf. Name</em>, City, Country, 2024, pp. 100–110.</p>
`
  },
  {
    id: "acm",
    name: "ACM",
    fullName: "ACM Digital Library",
    description: "ACM format for publications in the ACM Digital Library. Used for SIGCOMM, CHI, PLDI and other ACM conferences.",
    color: "from-red-500 to-orange-600",
    badge: "ACM Official",
    sections: ["Abstract", "Keywords", "CCS Concepts", "Introduction", "Background", "Methodology", "Evaluation", "Results", "Conclusion", "Acknowledgments", "References"],
    initialContent: `
<h1 style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:6px;">Title of Your ACM Research Paper</h1>
<p style="text-align:center; margin-bottom:4px;">First Author</p>
<p style="text-align:center; font-size:12px; margin-bottom:4px;">Institution / University</p>
<p style="text-align:center; font-size:12px; margin-bottom:4px;">City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:20px;">email@institution.edu</p>

<h2>Abstract</h2>
<p>Provide a concise and factual abstract of no more than 250 words. The abstract should state the purpose of the research, principal results, and major conclusions.</p>

<h2>Keywords</h2>
<p>Keyword1; Keyword2; Keyword3; Keyword4; Keyword5</p>

<h2>CCS Concepts</h2>
<p>• Computing methodologies → Machine learning; • Computer systems organization → Embedded systems</p>

<h2>1. Introduction</h2>
<p>Introduce the problem domain. Explain why this problem is important and challenging. State your specific contributions at the end of this section.</p>

<h2>2. Background</h2>
<p>Provide background information, definitions, and concepts that readers need to understand your work.</p>

<h2>3. Methodology</h2>
<p>Describe your approach, algorithms, system design, or experimental protocol in detail.</p>

<h2>4. Evaluation</h2>
<p>Describe your evaluation setup, metrics, datasets, and experimental configuration.</p>

<h2>5. Results</h2>
<p>Present and analyze your experimental results. Include tables and figures where appropriate.</p>

<h2>6. Conclusion</h2>
<p>Summarize your findings, state limitations, and propose directions for future work.</p>

<h2>Acknowledgments</h2>
<p>The authors would like to thank [funding body, colleagues, reviewers, etc.].</p>

<h2>References</h2>
<p>[1] Author A. 2024. Title of Paper. In <em>Proceedings of ACM Conference Name</em> (CONF '24). ACM, New York, NY, USA, Pages 1–10.</p>
`
  },
  {
    id: "apa",
    name: "APA",
    fullName: "APA Style (7th Edition)",
    description: "American Psychological Association style, widely used in social sciences, education, and psychology. Follows APA 7th edition guidelines.",
    color: "from-amber-500 to-yellow-600",
    badge: "APA 7th Ed",
    sections: ["Title Page", "Abstract", "Introduction", "Literature Review", "Methodology", "Results", "Discussion", "Conclusion", "References"],
    initialContent: `
<h1 style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:6px;">Title of Your APA Research Paper</h1>
<p style="text-align:center; margin-bottom:4px;">First Author<sup>1</sup>, Second Author<sup>2</sup></p>
<p style="text-align:center; font-size:12px; margin-bottom:4px;"><sup>1</sup>Department, University Name, City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:20px;"><sup>2</sup>Department, University Name, City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:24px;">Email: author@university.edu</p>

<h2>Abstract</h2>
<p>Write a concise summary of your research here. The abstract should briefly describe the problem, methodology, results, and conclusion in 150–250 words.</p>

<h2>Introduction</h2>
<p>Introduce your topic here. Explain the background, motivation, and significance of the research problem. State the objectives and contributions of your paper clearly.</p>

<h2>Literature Review</h2>
<p>Discuss existing literature and research related to your topic. Highlight gaps in existing work that your paper addresses.</p>

<h2>Methodology</h2>
<p>Describe your research methodology, experimental setup, datasets used, algorithms, and any theoretical framework in detail.</p>

<h2>Results</h2>
<p>Present your results with supporting data, graphs, and tables. Analyze and discuss the significance of your findings.</p>

<h2>Discussion</h2>
<p>Interpret your results, discuss their implications, limitations, and how they relate to existing literature.</p>

<h2>Conclusion</h2>
<p>Summarize the key contributions of your paper, limitations, and future research directions.</p>

<h2>References</h2>
<p>Author, A. A., & Author, B. B. (2024). <em>Title of the article</em>. <em>Journal Name</em>, <em>volume</em>(issue), page range. https://doi.org/xxxx</p>
`
  },
  {
    id: "scitepress",
    name: "Scitepress",
    fullName: "Scitepress Conference",
    description: "Scitepress format used for ICSOFT, WEBIST, IJCCI and other science and technology conference proceedings.",
    color: "from-green-500 to-teal-600",
    badge: "Conference Ready",
    sections: ["Abstract", "Keywords", "Introduction", "System Design", "Implementation", "Results", "Conclusion", "References"],
    initialContent: `
<h1 style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:6px; text-transform:uppercase;">Title of Your Scitepress Paper</h1>
<p style="text-align:center; margin-bottom:4px;">First Author<sup>1</sup> and Second Author<sup>2</sup></p>
<p style="text-align:center; font-size:12px; margin-bottom:4px;"><sup>1</sup>Department of Computer Science, University Name, City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:20px;"><sup>2</sup>Department of Engineering, University Name, City, Country</p>

<h2>Abstract</h2>
<p>The abstract should summarize the content of the paper, in 70 to 200 words. State the problem, your proposed approach, results, and conclusions.</p>

<h2>Keywords</h2>
<p>keyword1, keyword2, keyword3, keyword4</p>

<h2>1 Introduction</h2>
<p>Introduce the background and motivation for your research. Clearly state the problem you are addressing and why it is significant. Provide an overview of your approach.</p>

<h2>2 System Design</h2>
<p>Describe the architecture and design of your proposed system or solution. Use diagrams and figures where appropriate.</p>

<h2>3 Implementation</h2>
<p>Explain the implementation details — programming languages, frameworks, tools, and technical decisions made during development.</p>

<h2>4 Results</h2>
<p>Present experimental results, benchmarks, or case study outcomes. Discuss the performance and effectiveness of your approach.</p>

<h2>5 Conclusion</h2>
<p>Summarize the contributions, findings, and conclusions. Mention limitations and future work directions.</p>

<h2>References</h2>
<p>Author, A. and Author, B. (2024). Title of Paper. In <em>Proceedings of Conference Name</em>, pages 1–8. Scitepress.</p>
`
  },
  {
    id: "springer",
    name: "Springer",
    fullName: "Springer LNCS",
    description: "Springer Lecture Notes in Computer Science (LNCS) format. Used for ECCV, MICCAI, and hundreds of Springer conference proceedings.",
    color: "from-purple-500 to-indigo-600",
    badge: "LNCS Format",
    sections: ["Abstract", "Keywords", "Introduction", "Related Work", "Proposed Approach", "Experimental Setup", "Results", "Conclusion", "References"],
    initialContent: `
<h1 style="text-align:center; font-size:22px; font-weight:bold; margin-bottom:6px;">Title of Your Springer LNCS Paper</h1>
<p style="text-align:center; margin-bottom:4px;">First Author<sup>1</sup>, Second Author<sup>1,2</sup>, and Third Author<sup>2</sup></p>
<p style="text-align:center; font-size:12px; margin-bottom:4px;"><sup>1</sup>University / Institute Name, City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:20px;"><sup>2</sup>Second University Name, City, Country</p>
<p style="text-align:center; font-size:12px; margin-bottom:20px;">author@university.edu</p>

<h2>Abstract</h2>
<p>Write a concise abstract of 150–250 words. It should clearly state what the paper is about, the methods used, the results obtained, and the main conclusions. Avoid abbreviations and do not cite references in the abstract.</p>

<h2>Keywords</h2>
<p>First keyword · Second keyword · Third keyword · Fourth keyword</p>

<h2>1 Introduction</h2>
<p>Introduce the research context, state the problem clearly, and motivate why it is worth solving. End with a summary of the paper's main contributions and an outline of the rest of the paper.</p>

<h2>2 Related Work</h2>
<p>Review existing approaches to the problem. Discuss how your work differs from and improves upon prior work.</p>

<h2>3 Proposed Approach</h2>
<p>Describe your proposed method, framework, model, or algorithm in full detail. Use mathematical notation where applicable.</p>

<h2>4 Experimental Setup</h2>
<p>Describe the datasets, evaluation metrics, baseline methods, hardware/software environment, and hyperparameter settings used in your experiments.</p>

<h2>5 Results</h2>
<p>Present quantitative and qualitative results. Compare with baselines and analyze strengths and weaknesses of your approach.</p>

<h2>6 Conclusion</h2>
<p>Summarize the key takeaways, acknowledge limitations, and suggest avenues for future research.</p>

<h2>References</h2>
<p>1. Author, A., Author, B.: Title of paper. In: Proceedings of Conference (CONF 2024). LNCS, vol. 1234, pp. 1–15. Springer, Heidelberg (2024)</p>
`
  }
]

export const getTemplateById = (id) => {
  return TEMPLATES.find(t => t.id === id?.toLowerCase()) || null
}
