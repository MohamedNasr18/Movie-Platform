const mongoose=require('mongoose')
const Content = require('../models/content.module')
const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
poster:{
 type:String,
 required:true
},
role:{
type : String,
enum:["USER","ADMIN"],
default:"USER"
},
favourite:{
    type:[mongoose.Schema.Types.ObjectId],
    ref: Content
} 
},
    {timestamps:true},
)

module.exports=mongoose.model('User',userSchema)