import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import User from "./models/user.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import Draft from "./models/Draft.js"

dotenv.config()

const requiredEnvVariables = [
  "MONGODB_URI",
  "JWT_SECRET",
  "CLIENT_URL"
]

const missingEnvVariables = requiredEnvVariables.filter(
  (variableName) => !process.env[variableName]
)

if (missingEnvVariables.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingEnvVariables.join(", ")}`
  )
}

const JWT_SECRET = process.env.JWT_SECRET
const CLIENT_URL = process.env.CLIENT_URL
const PORT = process.env.PORT || 5000
const app = express()

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use(express.json({ limit: "10mb" }))

// ─── MongoDB Connection ───────────────────────────────────────────────────────

// ─── Auth Middleware ──────────────────────────────────────────────────────────
const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (
    !authorizationHeader ||
    !authorizationHeader.startsWith("Bearer ")
  ) {
    return res.status(401).json({
      message: "Authentication required"
    })
  }

  const token = authorizationHeader.slice(7).trim()

  if (!token) {
    return res.status(401).json({
      message: "Authentication required"
    })
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET)

    req.userId = decodedToken.userId

    next()
  } catch {
    return res.status(401).json({
      message: "Session expired or invalid"
    })
  }
}


const validateDraftId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      message: "Invalid draft ID"
    })
  }

  next()
}



// Validation helpers
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const normalizeEmail = (email) =>
  typeof email === "string"
    ? email.trim().toLowerCase()
    : ""

const createToken = (userId) =>
  jwt.sign(
    { userId },
    JWT_SECRET,
    { expiresIn: "7d" }
  )

const formatUser = (user) => ({
  id: user._id,
  username: user.username,
  email: user.email
})


const ALLOWED_DRAFT_TEMPLATES = new Set([
  "scratch",
  "ieee",
  "acm",
  "scitepress"
])

const MAX_DRAFT_TITLE_LENGTH = 150
const MAX_DRAFT_CONTENT_LENGTH = 8_000_000

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Research Paper App Server is running 🚀" })
})

// ─── Register ─────────────────────────────────────────────────────────────────
app.post("/api/register", async (req, res) => {
  try {
    const username =
      typeof req.body.username === "string"
        ? req.body.username.trim()
        : ""

    const email = normalizeEmail(req.body.email)

    const password =
      typeof req.body.password === "string"
        ? req.body.password
        : ""

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email and password are required"
      })
    }

    if (username.length < 2 || username.length > 50) {
      return res.status(400).json({
        message: "Username must be between 2 and 50 characters"
      })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        message: "Enter a valid email address"
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters"
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
      username,
      email,
      password: hashedPassword
    })

    const token = createToken(user._id)

    res.status(201).json({
      message: "Account created successfully",
      token,
      user: formatUser(user)
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists"
      })
    }

    console.error("Register error:", error.message)

    res.status(500).json({
      message: "Unable to create account"
    })
  }
})
// ─── Login ────────────────────────────────────────────────────────────────────
app.post("/api/login", async (req, res) => {
  try {
    const email = normalizeEmail(req.body.email)

    const password =
      typeof req.body.password === "string"
        ? req.body.password
        : ""

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required"
      })
    }

    if (!EMAIL_PATTERN.test(email)) {
      return res.status(400).json({
        message: "Enter a valid email address"
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password
    )

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password"
      })
    }

    const token = createToken(user._id)

    res.json({
      message: "Login successful",
      token,
      user: formatUser(user)
    })
  } catch (error) {
    console.error("Login error:", error.message)

    res.status(500).json({
      message: "Unable to log in"
    })
  }
})

// ─── Get Current User Profile ─────────────────────────────────────────────────
app.get("/api/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select(
      "_id email username"
    )

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
            user: formatUser(user)

    })
  } catch (error) {
    console.error("Profile error:", error.message)

    res.status(500).json({
      message: "Error fetching profile"
    })
  }
})

// ─── Create Draft ─────────────────────────────────────────────────────────────
app.post("/api/drafts", authMiddleware, async (req, res) => {
  try {
    const {
      title: rawTitle,
      content: rawContent,
      template: rawTemplate
    } = req.body

    if (
      rawTitle !== undefined &&
      typeof rawTitle !== "string"
    ) {
      return res.status(400).json({
        message: "Title must be text"
      })
    }

    if (typeof rawContent !== "string") {
      return res.status(400).json({
        message: "Content is required and must be text"
      })
    }

    if (
      rawTemplate !== undefined &&
      typeof rawTemplate !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid template"
      })
    }

    const title =
      rawTitle?.trim() || "Untitled Paper"

    const content = rawContent

    const template =
      rawTemplate?.trim().toLowerCase() || "scratch"

    if (title.length > MAX_DRAFT_TITLE_LENGTH) {
      return res.status(400).json({
        message: `Title cannot exceed ${MAX_DRAFT_TITLE_LENGTH} characters`
      })
    }

    if (content.length > MAX_DRAFT_CONTENT_LENGTH) {
      return res.status(400).json({
        message: "Paper content is too large"
      })
    }

    if (!ALLOWED_DRAFT_TEMPLATES.has(template)) {
      return res.status(400).json({
        message: "Invalid paper template"
      })
    }

     const draft = await Draft.create({
      userId: req.userId,
      title,
      content,
      template
    })


    res.status(201).json({
      message: "Draft created",
      draft
    })
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Invalid draft data"
      })
    }

    console.error("Create draft error:", error.message)

    res.status(500).json({
      message: "Error creating draft"
    })
  }
})

// ─── Get All Drafts (for logged-in user) ──────────────────────────────────────
app.get("/api/drafts", authMiddleware, async (req, res) => {
  try {
    const drafts = await Draft.find({ userId: req.userId })
      .sort({ updatedAt: -1 })
      .select("title template createdAt updatedAt")
      
    res.json(drafts)
  } catch (error) {
    console.error("Fetch drafts error:", error.message)
    res.status(500).json({ message: "Error fetching drafts" })
  }
})

// ─── Get Single Draft ─────────────────────────────────────────────────────────
   app.get(
    "/api/drafts/:id",
    authMiddleware,
    validateDraftId,
    async (req, res) => {
      try {
       const draft = await Draft.findOne({ 
         _id: req.params.id, userId: req.userId 
         })

       if (!draft) {
        return res.status(404).json({
          message: "Draft not found" })
        }

       res.json(draft)
       } catch (error) {
         console.error("Fetch draft error:", error.message)

         res.status(500).json({ message: "Error fetching draft" })
      }
   })

// ─── Update Draft (Auto-save & Manual save) ───────────────────────────────────
app.put(
  "/api/drafts/:id",
  authMiddleware,
  validateDraftId,
  async (req, res) => {
    try {
      const { title, content } = req.body
      const hasTitle = Object.hasOwn(req.body, "title")
      const hasContent = Object.hasOwn(req.body, "content")

      if (!hasTitle && !hasContent) {
        return res.status(400).json({
          message: "Title or content is required"
        })
      }

      if (hasTitle && typeof title !== "string") {
        return res.status(400).json({
          message: "Title must be text"
        })
      }

      if (hasContent && typeof content !== "string") {
        return res.status(400).json({
          message: "Content must be text"
        })
      }

      const updates = {}

      if (hasTitle) {
        const normalizedTitle =
          title.trim() || "Untitled Paper"

        if (
          normalizedTitle.length >
          MAX_DRAFT_TITLE_LENGTH
        ) {
          return res.status(400).json({
            message: `Title cannot exceed ${MAX_DRAFT_TITLE_LENGTH} characters`
          })
        }

        updates.title = normalizedTitle
      }

      if (hasContent) {
        if (content.length > MAX_DRAFT_CONTENT_LENGTH) {
          return res.status(400).json({
            message: "Paper content is too large"
          })
        }

        updates.content = content
      }

      const draft = await Draft.findOneAndUpdate(
        {
          _id: req.params.id,
          userId: req.userId
        },
        updates,
        {
          returnDocument: "after",
          runValidators: true
        }
      )

      if (!draft) {
        return res.status(404).json({
          message: "Draft not found"
        })
      }

      res.json({
        message: "Draft saved",
        draft
      })
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(400).json({
          message: "Invalid draft data"
        })
      }

      console.error("Update draft error:", error.message)

      res.status(500).json({
        message: "Error updating draft"
      })
    }
  }
)

// ─── Delete Draft ─────────────────────────────────────────────────────────────
app.delete(
  "/api/drafts/:id",
  authMiddleware,
  validateDraftId,
  async (req, res) => {  
    try {
    const draft = await Draft.findOneAndDelete({
       _id: req.params.id, 
       userId: req.userId 
      })
    if (!draft) {
      return res.status(404).json({ 
        message: "Draft not found" })
      }

    // Log activity
    
    res.json({ message: "Draft deleted" })
  } catch (error) {
      console.error("Delete draft error:", error.message)

    res.status(500).json({
       message: "Error deleting draft" })
  }
})


// const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
    process.exit(1);
  }
};

startServer();






// ─── Start Server ─────────────────────────────────────────────────────────────
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`)
// })



// mongoose.connect(process.env.MONGODB_URI)
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.log("❌ MongoDB error:", err.message))
