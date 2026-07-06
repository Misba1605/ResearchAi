import mongoose from "mongoose"

const ALLOWED_TEMPLATES = [
  "scratch",
  "ieee",
  "acm",
  "apa",
  "scitepress",
  "springer"
]

const draftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    title: {
      type: String,
      trim: true,
      default: "Untitled Paper",
      maxlength: 150
    },

    content: {
      type: String,
      default: "",
      maxlength: 8_000_000
    },

    template: {
      type: String,
      enum: ALLOWED_TEMPLATES,
      default: "scratch"
    }

  },
  {
    timestamps: true
  }
)

draftSchema.index({
  userId: 1,
  updatedAt: -1
})

const Draft = mongoose.model("Draft", draftSchema)

export default Draft