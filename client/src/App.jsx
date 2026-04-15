import { Routes, Route } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Templates from "./pages/Templates"
import Editor from "./pages/Editor"
import Register from "./pages/Register"

function App() {
  return (
    <Routes>
      {/* Layout wrapper */}
      <Route path="/" element={<MainLayout />}>
        
        {/* Child routes */}
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="templates" element={<Templates />} />
        <Route path="editor/:templateName" element={<Editor />} />
        {/* <Route path="/editor" element={<Editor />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/my-drafts" element={<MyDrafts />} />
      </Route>
    </Routes>
  )
}

export default App