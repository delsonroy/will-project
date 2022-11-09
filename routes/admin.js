const express = require('express');
const chats = require('../models/chats');
const bcrypt = require("bcrypt");
const router = express.Router();




const registration  = require('../models/registration');

const  auth = require("../auth/authin")
const mt = require('./login');



router.use(auth.isLogin)







router.get('/index',(req,res)=>{
   console.log(req.session.usrid)
   registration.findOne({_id: req.session.usrid},(err,doc)=>{


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


router.get('/createuser',(Req,res)=>{
   res.render('Createuse',{data:null})
})


router.post('/CreateUser',(req,res)=>{
   // console.log("sdfrgty")
   // console.log(req.body.email)
   const Password = req.body.pass;
   
   const hash = bcrypt.hashSync(Password, 2);
   
      const user = new registration({
       firstname:req.body.firstname,
       lastname:req.body.lastname,
       email:req.body.email,
       password:hash,
       dateofbirth:String(req.body.dob),
       department:req.body.department,
       experience:String(req.body.experience),
       phonenumber:req.body.phone,
       address:String(req.body.add),
       education:req.body.education,
       profilecomplete:"yes",
       status:"active"
      })
   
    console.log(user)
      const emial = registration.findOne({email:user.email})
      .then((doc)=>{
          if(doc==null){
           const ne = user.save()
         
           res.render('Createuse',{data:true})
          }else{
           res.render('Createuse',{data:false})
          }
      })
      .catch((Error)=>{
       res.sendStatus(400)
      })
   
     
   });







module.exports = router