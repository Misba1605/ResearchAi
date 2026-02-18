import TemplateCard from "../components/TemplateCard"



function Templates() {

  const templates = [
    {
      title: "IEEE",
      description: "Standard IEEE research paper format with structured sections."
    },
    {
      title: "Scitepress",
      description: "Conference-ready template for Scitepress publications."
    },
    {
      title: "ACM",
      description: "Professional ACM journal format with citation structure."
    }
  ]

  return (
    <div>
      <h2 className="text-4xl font-bold text-center mb-10">
        Choose Your Template
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {templates.map((template, index) => (
          <TemplateCard
            key={index}
            title={template.title}
            description={template.description}
          />
        ))}
      </div>
    </div>
  )
}

export default Templates
