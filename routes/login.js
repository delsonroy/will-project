const express = require('express');

const session = require("express-session")
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const nodemailer= require("nodemailer")
const randomstring = require("randomstring")

router.use(session({secret:"hellomynameisprabhjot",cookie: { secure: !true }}))



const registration = require("../models/registration")
const user = require('./user')



const sendMailtoResetpass =async(name,email,tokan)=>{
    try {
     const tranporter=    nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        requireTLS:true,
        auth:{
            user:"prabhjotsingh2598@gmail.com",
            pass:"anmolsingh"
        }

           

        })

        const mailOption= {
            from:"artistsmanagement@mail.com",
            to:email,
            subject:'For Reset Password',
            html:'<p>Hii ' +name+' Please copy the link <a href="http://127.0.0.1:4000/resetpassword?token='+tokan+'"> reset your password</a> '
        } 

        tranporter.sendMail(mailOption,function(error,info){
            if(error){
                console.log(error)
            }
            else{
                console.log("mail is sent"+info)
            }
        })


        
    } catch (error) {
        console.log(error)
    }
}






















// LOGIN PAGE

router.get('/',(req,res)=>{
    res.render('loggin',{data:null})
   });

router.post('/',(req,res)=>{
    console.log(req.body)
const data =  registration.findOne({email:req.body.username},(err,doc)=>{

    //IF USER IS NOT IN THE DATABASE
    if(doc==null){
        res.render('loggin',{data:false})
    }
    else{

        // CALL THE COMPARE FUNCTION
        let userToken = comparePassword (req.body.password,doc.password)
        console.log(userToken) 
        
        userToken.then(function(result) {
        //    console.log(result)
           if(result==false){
             res.render('loggin',{data:true})
           }else{
           
           if(doc.status=="active"){
              
        
            if(doc.role=="admin"){
                console.log(doc.email)
                req.session.usrid= doc._id;
                req.session.id= doc.email;

                req.session.save();
                
              
                res.redirect('/admin/index')
             
            }
            else if(doc.role=="user"){
                req.session.usrid= doc._id;
                req.session.id= doc.email;
                res.redirect('/user') 
            

            }
          
            else{
               
           }
    
        
        }else{
            res.render('loggin',{data:"one"})
        }
      
      
            
           }
        })
    }
   

})
    
    

  //FUNCTION OF COMPARE THE USER PASSWORD AND HASH STRING 
    const comparePassword = async (password, hash) => {
        try {
          
            return await bcrypt.compare(password, hash);
        } catch (error) {
            console.log(error);
        }
    
     
        return false;
    };

})





// registration page 


router.get('/registration',(req,res)=>{
    res.render('signup',{data:null})
});

router.post('/registration',(req,res)=>{
   console.log(req.body.name)
    const Password = req.body.pass;
    console.log(Password)
const hash = bcrypt.hashSync(Password, 2);

   const user = new registration({
    firstname:req.body.name,
    lastname:req.body.lastname,
    email:req.body.email,
    password:hash,
    dateofbirth:req.body.dob
   })


   const emial = registration.findOne({email:user.email})
   .then((doc)=>{
       if(doc==null){
        const ne = user.save()
        res.render('signup',{data:true})
       }else{
        res.render('signup',{data:false})
       }
   })
   .catch((Error)=>{
    res.sendStatus(400)
   })

  
});



router.get('/logout',(req,res)=>{
    try {
        req.session.destroy();
        res.redirect('/')
    } catch (error) {
        
    }
})


router.get('/forgetpass',(req,res)=>{
    res.render('resetpass')
})



router.post('/forgetpass',async(req,res)=>{
    try {

        const userDate = await registration.findOne({email:req.body.email});
        if(userDate){

            const random = randomstring.generate();
            sendMailtoResetpass(userDate.firstname,userDate.email,randomstring)
           const data = registration.updateOne({email:req.body.email},{$set:{token:random}})

          


        }else{
            res.status(400).send({success:false,msg:error.message})
        }
        
    } catch (error) {
        res.status(400).send({success:false,msg:error.message})
    }
})












module.exports = router