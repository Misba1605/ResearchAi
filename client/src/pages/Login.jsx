import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

     const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password
    })
     console.log(res.data);
     
    // Store token (for now fake token)
    localStorage.setItem("token", "dummy-token")

    //  Redirect
    navigate("/templates")

  } catch (error) {
    console.log(error)
    alert("Login failed")
  
    }
  }
  

  return (
    <div className="flex flex-col items-center mt-20">

      <h2 className="text-3xl font-bold mb-6">Login</h2>

      <input
        type="email"
        placeholder="Enter email"
        className="mb-4 p-2 rounded bg-gray-800"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        className="mb-4 p-2 rounded bg-gray-800"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 px-4 py-2 rounded"
      >
        Login
      </button>

     <p className="mt-4">
      New user? <span onClick={() => navigate("/register")} className="text-blue-400 cursor-pointer">Register here</span>
    </p>
    </div>
  )
}

export default Login