import express from "express"
import cors from "cors" 
import mongoose from "mongoose"  
import User from "./models/user.js" 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import Draft from "./models/Draft.js";

const JWT_SECRET = "mysupersecretkey"

const app = express()      //backend server
 console.log("🚀 NEW SERVER FILE RUNNING");
app.use(cors())      //cors communicates between frntend and bckend
app.use(express.json())      //allows backend to read JSON data

//backend server connection
mongoose.connect("mongodb://Admin:M1234@ac-yxmr4hd-shard-00-00.kw5q67l.mongodb.net:27017,ac-yxmr4hd-shard-00-01.kw5q67l.mongodb.net:27017,ac-yxmr4hd-shard-00-02.kw5q67l.mongodb.net:27017/researchDB?ssl=true&replicaSet=atlas-z8g52c-shard-0&authSource=admin&appName=Cluster0")       //
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.log(err))


app.get("/", (req, res) => {  //GET(api)
  res.send("Server is running")    //res=response given to browser
                                   //req=reaquesting from client
})

//user registration api 
app.post("/api/register", async (req, res) => {
  try {
    const { email, password } = req.body

    // Check if user exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      })
    }

    //  Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // 💾 Save user
    const user = await User.create({
      email,
      password: hashedPassword
    })

    console.log("Saved user:", user)

   const token = jwt.sign(
     { userId: user._id },
      JWT_SECRET,
     { expiresIn: "1d" }
)

  res.json({
    message: "User registered successfully",
    token,
    user 
 })

  } catch (error) {
    console.log("🔥 REGISTER ERROR:", error.message)

    res.status(500).json({
      message: "Error registering user"
    })
  }
})



   //middleware
  const authMiddleware = (req, res, next) => {

  try {

    const token = req.headers.authorization

    if (!token) {
      return res.status(401).json({
        message: "No token, access denied"
      })
    }


    // verify token
    const decoded = jwt.verify(token, JWT_SECRET)

    req.userId = decoded.userId

    next()  // continue to next step

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    })
  }

}


//login api
app.post("/api/login", async (req, res) => {
   console.log("🔥 LOGIN API HIT");
  try {

    const { email, password } = req.body


    console.log("Email entered:", email)
    // Check if user exists
    const user = await User.findOne({ email })
    console.log("User found:", user)


    if (!user) {
      return res.status(400).json({
        message: "User not found"
      })
    }

    // Check password and match 
   const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
    return res.status(400).json({
    message: "Invalid password"
  })
}

    // Success

    const token = jwt.sign(
     { userId: user._id },
    JWT_SECRET,
     { expiresIn: "1d" }
)
     res.json({
     message: "Login successful",
     token,
     user
  })

  } catch (error) {
    res.status(500).json({
      message: "Login error"
    })
  }

})



//middleware route
  app.get("/api/profile", authMiddleware, (req, res) => {

    res.json({
    message: "Protected data",
    userId: req.userId
  })

})

 //draft api
 app.post("/api/drafts", async (req, res) => {
  try {

    const { title, content, template } = req.body

    // get token from headers
     const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(401).json({
        message: "No token, unauthorized"
      })
    }

    // verify token
    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(token, JWT_SECRET)

    const userId = decoded.userId

    // create draft
    const draft = await Draft.create({
      userId,
      title,
      content,
      template
    })

    res.json({
      message: "Draft saved",
      draft
    })

    console.log("BODY:", req.body)
    console.log("HEADERS:", req.headers.authorization)

  } catch (error) {
    console.log("Draft Error", error.message)
    res.status(500).json({
      message: "Error saving draft",
       error: error.message
    })
  }
})




//server response
app.listen(5000, () => {           //runs backend on port 5000
  console.log("Server running on port 5000")     //runs when server starts
})


