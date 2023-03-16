const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile:{ type: String, required: true },
    pic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0R8wqjKARkqLdA1THBP4VmQIHzP9zLtosZg&usqp=CAU",
    }, 
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword=async function(enteredPassword ){
  return await bcrypt.compare(enteredPassword,this.password)
}

// pre means before saving * middleware
userSchema.pre('save',async function (next){
   if(!this.isModified){
    next()
   }

   const salt = await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt)
})
const User = mongoose.model("User", userSchema);
module.exports = User;
