const { localsName } = require('ejs')
const mongoose = require('mongoose')


const registration= new mongoose.Schema({

 firstname:{
    type:String,
    required:true
 },
 lastname:{
    type:String,
    require:true
 },
 email:{
    type:String,
    require:true
 },
 password:{
    type:String,
    required:true
 },
 dateofbirth:{
    type:String,
    required:true
 },
 role:{
    type:String,
    default:"user"
 },
 department:{
     type:String,
     default:null
 },
 experience:{
   type:String
 },
 status:{
    type:String,
    default:"inactive"
 },
phonenumber:{
   type:String,
   requred:true
},
address:{
   type:String,
   

},
education:{
   type:String
},profilecomplete:{
    type:String,
    default:"no"
},
manger:{
   type:String,
   default:"no"
},
statuschangereq:{
   type:String,
   default:"no"
},
token:{
   type:String,
   
}
 


})


module.exports = mongoose.model('registration',registration)