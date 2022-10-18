const express = require('express');
const chats = require('../models/chats');
const router = express.Router();




const registration  = require('../models/registration');


const mt = require('./login');

function loggin(req,res,next){
   if(mt.logg=="login"){
       console.log(mt.idd)
      next()
   }
   else{
       res.send("please login to access this page")
   }
}

router.use(loggin)







router.get('/index',(req,res)=>{
   registration.findOne({email:mt.idd},(err,doc)=>{


      chats.find((err,docs)=>{
         res.render('index',{data:docs,list:doc})
      })
   })
})

router.get('/',(req,res)=>{
 

   const status = registration.find({status:"inactive"},(Error,docs)=>{
  
  
    const list = registration.find((Error,doc)=>{
            //   res.render('index'())
        res.render('adminindex',{dat:doc,list:docs}) 
    })
    
   })
})


router.post('/update',(req,res)=>{
    
const stt= String(req.body.status)
const id = String(req.body.id)
const depart = String((req.body.depart))
   

           

               registration.findByIdAndUpdate({_id:id},{$set:{status:stt,department:depart}},(err,docs)=>{
                if(!err){
                   console.log(docs)
                    res.redirect('/admin')
                }else{
                  console.log(err)
                }
               })
        
 
})


router.get('/user',(req,res)=>{
 registration.find((Error,doc)=>{
    res.render('user',{data:doc})
 })

 
})







module.exports = router