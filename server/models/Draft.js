import mongoose from "mongoose"

const draftSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  title: {
    type: String,
    default: "Untitled"
  },
  content: {
    type: String,
    default: ""
  },
  template: {
    type: String,
    default: "IEEE"
  }
}, { timestamps: true })

export default mongoose.model("Draft", draftSchema)