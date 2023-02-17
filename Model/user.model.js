const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    gender:String,
    picture: {
        large: String,
        medium:String,
        thumbnail: String
      },
      email:String,
      location:{
        city:String,
        state:String,
        country:String
      },
      dob:{date:String,age:Number},
      registered:{date:String,age:Number},
      nat:String
      
})

const userModel=mongoose.model("user",userSchema)

module.exports={userModel}