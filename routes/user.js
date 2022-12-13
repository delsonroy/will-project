const express = require('express');
const registration = require('../models/registration')
const chats = require('../models/chats')

const  router = express.Router();
const mt = require('./login');
const { response } = require('express');


const  auth = require("../auth/authin")
const event = require('../models/events')
=======








router.use(auth.isLogin)

router.get('/',(req,res)=>{
   
   
const checkUser = registration.findOne({_id: req.session.usrid},(err,doc)=>{
    try{
   if(doc.profilecomplete=="no"){
    res.render('userinfo',{list:doc})
   }
   else{
    chats.find((err,docs)=>{
        event.find((err,event)=>{
        res.render('index',{data:docs,list:doc,event})
        })
    })
    // res.render('userprofile',{list:doc})
   }}
   catch(err){
    res.status(400);
   }
})
})

router.post('/complate',(req,res)=>{
  
    const addres = String(req.body.add)
  
    const newdata= registration.findOneAndUpdate({_id: req.session.usrid},{ department:req.body.depart,
        experience:String(req.body.year),
        phonenumber:req.body.phone,
        address:addres,
        education:req.body.edu,
        profilecomplete:"yes"},(err,doc)=>{
            if(!err){
                res.render('userprofile',{list:doc})
            }
            else{
                res.send("there is error while insert the data info your profile")
            }
        })
})


///
router.get('/chat',(req,res)=>{
    registration.findOne({_id: req.session.usrid},(err,doc)=>{
    chats.find((err,docs)=>{
        event.find((err,event)=>{
        res.render('index',{data:docs,list:doc,event})
        })
    })
})
})


router.post('/chat',(req,res)=>{
    console.log(mt.id);
    const dt = new Date()

    registration.findOne({_id: req.session.usrid},(err,doc)=>{

   
 

  const chat = new chats({
    email:doc.email,
    messages:req.body.message,
    
  })

  try{
     const data = chat.save().then((doc)=>{
      res.redirect('./chat')
     }).catch((Error)=>{
        console.log(Error)
     })
 
    
  }
  catch(err){
      res.send("error occur during the send message")
  }
})  
})


router.get('/profile',(req,res)=>{
    registration.findOne({_id: req.session.usrid},(err,doc)=>{

        res.render('userprofile',{list:doc})

    })
    
})


router.get('/access',(req,res)=>{
 registration.findById({_id:req.session.usrid},(err,doc)=>{
    
    res.render('access',{doc})
 })
    
})



router.post('/access',(req,res)=>{

    registration.findOneAndUpdate({_id: req.session.usrid},{statuschangereq:req.body.request},{new:true},(err,doc)=>{
    res.render("access",{doc})
    })
})










module.exports = router