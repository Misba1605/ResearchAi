import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [error, setError] = useState("")

  const handleRegister = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/register",
        { email, password }
      )

    //   console.log(res.data)

      // redirect to editor
     const { token } = res.data
        localStorage.setItem("token", token)
      navigate("/templates")

    } catch (error) {
      if (error.response) {
        setError(error.response.data)
      } else {
        setError("Server error")
      }
    }
}

    
  return (
    <div className="flex flex-col items-center mt-20">

      <h2 className="text-3xl font-bold mb-6">Register</h2>

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
        onClick={handleRegister}
        className="bg-green-600 px-4 py-2 rounded"
      >
        Register
      </button>
      
      <p className="text-red-500 mt-2">{error}</p>
         <p className="mt-2">
      Already have account? 
    <span 
      onClick={() => navigate("/login")} 
      className="text-blue-400 cursor-pointer ml-1"
  >
    Login
  </span>
</p>
    </div>
  )
}

export default Register