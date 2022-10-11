const express = require('express')
const router = express.Router();




const registration  = require('../models/registration');


const logg = require('./login');
const loggin  = (req,res,next)=>{
   console.log(logg.id)
}

router.get('/',(req,res)=>{
  loggin()
   const status = registration.find({status:"inactive"},(Error,docs)=>{
  
  
    const list = registration.find((Error,doc)=>{
 
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