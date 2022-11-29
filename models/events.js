const mongoose = require('mongoose')


const events = new mongoose.Schema({
    name:{
        type:String
    },
    place:{
        type:String
    },
    date:{
        Type:String
    },
    description:{
        type:String
    },
    totaltickets:{
        type:Number,
        default:0
    }
})


module.exports=  mongoose.model('events',events)