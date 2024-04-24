const mongoose=require("mongoose")
require('dotenv').config()
const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('DevChat',logInSchema)

module.exports=LogInCollection