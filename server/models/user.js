import mongoose from "mongoose"

const userSchema = new mongoose.Schema({    //creates a schema(structure in which data is stored)
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const User = mongoose.model("User", userSchema)    //creates the actual model/collection from the given schema where user is the modelname 

export default User