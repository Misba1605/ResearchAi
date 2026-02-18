import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Templates from "./pages/Templates.jsx"
import Login from "./pages/Login.jsx"
import MainLayout from "./layouts/Mainlayout.jsx"
import Editor from "./pages/Editor.jsx"


function App(){
  return(
    <MainLayout>
      <Routes>
        <Route path= "/" element={<Home />} />
        <Route path="/templates" element={<Templates />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/editor/:templateName" element={<Editor />} />

      </Routes>
    </MainLayout>
  )
}

export default App