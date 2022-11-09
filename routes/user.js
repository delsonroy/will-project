const express = require('express');
const registration = require('../models/registration')
const chats = require('../models/chats')

const  router = express.Router();
const mt = require('./login');
const { response } = require('express');

function loggin(req,res,next){
    if(mt.log=="login"){
        console.log(mt.log)
       next()
       mt.log="ff"
    }
    else{
        res.send("please login to access this page")
    }
}








router.use(loggin)

router.get('/',(req,res)=>{
   
   
const checkUser = registration.findOne({email:mt.id},(err,doc)=>{
    try{
   if(doc.profilecomplete=="no"){
    res.render('userinfo',{list:doc})
   }
   else{
    chats.find((err,docs)=>{
        res.render('index',{data:docs,list:doc})
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
  
    const newdata= registration.findOneAndUpdate({email:mt.id},{ department:req.body.depart,
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
    registration.findOne({email:mt.id},(err,doc)=>{
    chats.find((err,docs)=>{
        res.render('index',{data:docs,list:doc})
        
    })
})
})


router.post('/chat',(req,res)=>{
    console.log(mt.id);
    const dt = new Date()
 

  const chat = new chats({
    email:mt.id,
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


router.get('/profile',(req,res)=>{
    registration.findOne({email:mt.id},(err,doc)=>{

        res.render('userprofile',{list:doc})

    })
    
})










module.exports = router