const mongoose = require('mongoose')


const events = new mongoose.Schema({
    name:{
        type:String
    },
    place:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number,

    },

    totaltickets:{
        type:Number,
        default:0
    },
    photourl:{
        type:String
    }
})


module.exports=  mongoose.model('events',events)