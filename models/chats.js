const mongoose = require('mongoose')



const chats = new mongoose.Schema({
    
   email:{
    type:String
   },
   messages:{
     type:String
   },
   time:{
    type:Date
   }


})


module.exports=  mongoose.model('chats',chats)