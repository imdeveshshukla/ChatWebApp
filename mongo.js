const mongoose=require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/DevChatApp")
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