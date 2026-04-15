import { useState, useEffect, useRef} from "react"
import { useParams } from "react-router-dom"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import html2pdf from "html2pdf.js"
import { useNavigate } from "react-router-dom"
import axios from "axios"



function Editor() {
  
  const { templateName } = useParams() //useParams(react hook) reads data from url and stores it in templateName [Destructuring:electively picking values from an object]
  console.log("Template Name:", templateName)  //prints the name in console to check or debug.
  const editorRef = useRef(null)        //stores reference to access editor html.
  const storageKey = `draft-${templateName ?? "default"}`  //creates a separate draft to store data for each template
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("Saved")   //useState stores changes in data(saving indicator)(const[var,func] = useState(initialValue))
  const [content, setContent] = useState("")    //same stores changes in actual content

  console.log("URL PARAM templateName:", templateName)
  console.log("template name:", templateName);
  
//Download function
  const handleDownload = () => {
  const element = editorRef.current //stores actual DOM element(get actual HTML content of editor)

  const options = {      //object with key:value pairs
    margin: 10,
    filename: `${templateName}-paper.pdf`,
    image: { type: "jpeg", quality: 0.98 },    //nested object
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }   //nested object
  }

  html2pdf().set(options).from(element).save()  //chaining(1.creates pdf instance 2.applies features from options object 3.takes the actual html element 4.saves and downloads the file)
}


  //navigate function
   useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) {
     navigate("/login")
  }
}, [navigate])

  

  // Load draft or template
  useEffect(() => {
    const savedDraft = localStorage.getItem(storageKey)

    if (savedDraft) {
      setContent(savedDraft)
    } else {

      let template = ""
      const name = templateName?.toLowerCase()
      if (name === "acm") {
        template = `
          <h1>ACM Paper Title</h1>
          <p>Author Names</p><p><br/></p>

          <h2>Abstract</h2><p><br/></p>
          <h2>Keywords</h2><p><br/></p>
          <h2>Introduction</h2><p><br/></p>
          <h2>Methodology</h2><p><br/></p>
          <h2>Results</h2><p><br/></p>
          <h2>Conclusion</h2><p><br/></p>
          <h2>References</h2><p><br/></p>
        `
      }

      else if (name === "ieee") {
        template = `
          <h1>IEEE Paper Title</h1>
          <p>Author Names</p><p><br/></p>

          <h2>Abstract</h2><p><br/></p>
          <h2>Index Terms</h2><p><br/></p>
          <h2>Introduction</h2><p><br/></p>
          <h2>Methodology</h2><p><br/></p>
          <h2>Results</h2><p><br/></p>
          <h2>Conclusion</h2><p><br/></p>
          <h2>References</h2><p><br/></p>
        `
      }

      else if (name === "scitepress") {
        template = `
         <h1 style="text-align:center;">Scitepress Paper Title</h1>
         <p style="text-align:center;">Author Names</p>

         <h2>Abstract</h2>
         <p><br/></p>

         <h2>Keywords</h2>
         <p><br/></p>

         <h2>Introduction</h2>
         <p><br/></p>

         <h2>System Design</h2>
         <p><br/></p>

         <h2>Implementation</h2>
         <p><br/></p>

         <h2>Results</h2>
         <p><br/></p>

         <h2>Conclusion</h2>
         <p><br/></p>

        <h2>References</h2>
        <p><br/></p>
`
      }

      else {
        template = `<h1>Default Template</h1>`
      }

      setContent(template)
    }

  }, [storageKey, templateName])



  // Auto save
  //Debouncing - Wait for user to stop typing → then perform action
  useEffect(() => {

    setStatus("Saving...")

    const timer = setTimeout(() => {
      localStorage.setItem(storageKey, content)
      setStatus("Saved")
    }, 2000)

    return () => clearTimeout(timer)

  }, [content, storageKey])


//save function

   const handleSave = async () => {
  try {
    setStatus("Saving")
    const token = localStorage.getItem("token")

    const res = await axios.post(
      "http://localhost:5000/api/drafts",
      {
        title,
        content,   // your editor content state
        template: templateName
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log(res.data)
    setStatus("Saved to database ✅") 
    alert("Draft saved successfully ✅")

  } catch (error) {
    console.log(error)
    setStatus("Save failed ❌")
    alert("Error saving draft ❌")
  }
}




  return (
     
    <div className="flex justify-center bg-gray-900 text-white min-h-screen py-10">

      <div className="w-[900px]" ref={editorRef}>

        <h2 className="text-xl font-bold mb-4 text-center">
          {templateName?.toUpperCase()} Template
        </h2>
          
          {/* //input field */}
        <input
           type="text"
           placeholder="Enter paper title"
           className="mb-4 p-2 w-full bg-gray-800 rounded"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
          />
          

         {/* //save button */}
         <button
           onClick={handleSave}
           className="bg-blue-600 px-4 py-2 rounded mb-4"
         >
           Save Draft
         </button>
       
       {/* //download button */}
        <button
          onClick={handleDownload}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
           Download PDF
        </button>
        

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="bg-white h-[80vh]"
        />

        <p className="text-gray-500 mt-4 text-sm">
          {status}
        </p>

      </div>

    </div>
  )

}

export default Editor