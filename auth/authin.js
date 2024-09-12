const isLogin = async(req,res,next)=>{
    console.log("hhhh"+ req.session.usrid)
    try {
     
        if( req.session.usrid){}
        else{
            res.redirect("/login")
        }
        next()
        
    } catch (error) {
        console.log(error.message)
    }
}


const isLogout = async(req,res,next)=>{
    try {
        if(req.session.usrid){
            res.redirect("/user")
        }
        next()
    } catch (error) {
        console.log(error.message)
    }
}

module.exports={
    isLogin,
    isLogout
}
