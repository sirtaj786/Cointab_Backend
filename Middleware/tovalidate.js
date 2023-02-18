const  {userModel}=require("../Model/user.model")


const tovalidate=async(req,res,next)=>{
const data=await userModel.find()

if(data.length>0){
    next()
}else{
   return res.status(400).send({msg:"Something wrong in url please check"})
}
}

module.exports={tovalidate}