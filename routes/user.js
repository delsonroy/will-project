const express = require('express');
const registration = require('../models/registration')


const  router = express.Router();
const mt = require('./login')

function loggin(req,res,next){
    if(mt.log=="login"){
        console.log(mt.log)
       next()
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
    res.render('userprofile',{list:doc})
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







module.exports = router