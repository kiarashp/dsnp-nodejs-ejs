module.exports = (req,res,next)=>{
    if(!req.session.loggedin){
         return res.status(401).redirect('/login')
    }
    else{
        next()
    }
}